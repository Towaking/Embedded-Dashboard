import { Line } from "react-chartjs-2";
import {useEffect, useState} from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import {
    getDataC0,
    getDataC02,
    getDeviceStatus,
    getPurifierStatus,
    setPurifierOff,
    setPurifierON
} from "../services/ApiServices.js";



ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

export const Dashboard = () => {
    const [deviceStatus, setDeviceStatus] = useState(false);
    const [purifierStatus, setPurifierStatus] = useState(false);
    const [purifierControl, setPurifierControl] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'C0 Emission Over Time',
                data: [],
                fill: true,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'CO2 Emission Over Time',
                data: [],
                fill: true,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                borderWidth: 2,
            },
        ],
    });

    const getData = async () => {
        const [C0, CO2] = await Promise.all([getDataC0(), getDataC02()]);
        console.log(C0, CO2);
        return { C0, CO2 };

    }


    useEffect(() => {
        let timeoutId;
        let isFetchingDeviceStatus = false;
        let isFetchingChartData = false;

        const fetchAndUpdateChartData = async () => {
            if (isFetchingChartData) return; // Prevent overlapping calls
            isFetchingChartData = true;
            try {
                const { C0, CO2 } = await getData();
                const currentTime = new Date().toLocaleTimeString();

                setChartData((prevChartData) => {
                    const maxDataPoints = 20;

                    return {
                        ...prevChartData,
                        labels: [...prevChartData.labels, currentTime].slice(-maxDataPoints),
                        datasets: [
                            {
                                ...prevChartData.datasets[0],
                                data: [...prevChartData.datasets[0].data, C0].slice(-maxDataPoints),
                            },
                            {
                                ...prevChartData.datasets[1],
                                data: [...prevChartData.datasets[1].data, CO2].slice(-maxDataPoints),
                            },
                        ],
                    };
                });
            } catch (error) {
                console.error("Error updating chart data:", error);
            } finally {
                isFetchingChartData = false;
                timeoutId = setTimeout(fetchAndUpdateChartData, 10000);
            }
        };

        const fetchAndUpdateDeviceStatus = async () => {
            if (isFetchingDeviceStatus) return; // Prevent overlapping calls
            isFetchingDeviceStatus = true;
            try {
                const status = await getDeviceStatus();
                setDeviceStatus(status);
            } catch (error) {
                console.error("Error fetching device status:", error);
            } finally {
                isFetchingDeviceStatus = false;
                timeoutId = setTimeout(fetchAndUpdateDeviceStatus, 5000);
            }
        };

        fetchAndUpdateDeviceStatus();
        fetchAndUpdateChartData();

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        let timeoutId;
        const fetchPurifierStatus = async () => {
            if (!deviceStatus) {
                timeoutId = setTimeout(fetchPurifierStatus, 2000);
                return;
            }

            try {
                const status = await getPurifierStatus();
                setPurifierStatus(status);
            } catch (error) {
                console.error("Error fetching purifier status:", error);
            } finally {
                timeoutId = setTimeout(fetchPurifierStatus, 2000);
            }
        };

        fetchPurifierStatus();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [deviceStatus]);


    const options = {
        responsive: false,
        plugins: {
            title: {
                display: true,
                text: 'Emission Data (C0 and CO2) Over Time',
            },
            legend: {
                position: 'top',
                display: true,
            },
        },
    };
    const toogleDeviceStatus = async () =>{
        if(purifierStatus){
            await setPurifierOff();
        }
        else{
            await setPurifierON()
        }
        setPurifierControl((e)=>!e);
    }

    return (
        <div className='h-screen flex flex-col gap-4'>
            <h1 className='w-full p-10 text-2xl'>Dashboard</h1>
            <h1 className='w-full pl-10 text-2xl'>Status Devices = <span className={`${deviceStatus ? 'text-green-500' : 'text-red-500'}`}>{deviceStatus ? "Online" : "Offline"}</span></h1>
            <div className='p-2 flex-grow '>
                <div className="p-4 flex flex-col gap-4">
                    <Line data={chartData} options={options} width={500} height={200} />
                    <label>Purifier Status: {purifierStatus} </label>
                </div>
                <div className='flex flex-grow w-[60%] flex-col'>
                    <label>Device Status</label>
                    <button
                        onClick={toogleDeviceStatus}
                        className={`mt-2 p-2 rounded ${purifierControl ? 'bg-green-500' : 'bg-red-500'} text-white`}
                        disabled={!deviceStatus ? true : false}
                    >
                        {purifierControl ? 'Turn Off' : 'Turn On'}
                    </button>
                </div>
            </div>
        </div>
    );
};
