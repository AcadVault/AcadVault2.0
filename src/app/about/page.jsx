import React from 'react';
import foundersData from './data.json';
import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const AboutPage = () => {
    const founders = foundersData.founders;

    return (
        <div className="left-0 top-0 -z-10 h-full w-full">
            <h1 className='text-4xl font-bold text-white text-center mt-10'>Founders</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 gap-4 p-1 md:p-5 mt-5">
                {founders.map((founder) => (
                    <div key={founder.name} className="p-4 bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg text-[#ffffff] text-center">
                        <Image src={founder.pfp} width={100} height={100} alt={founder.name} className="max-w-[32] max-h-[32] w-32 h-32 rounded-full mx-auto mb-5" />
                        <h2 className="text-lg font-semibold">{founder.name}</h2>
                        <p className="text-gray-500">{founder.position}</p>
                        <div className="flex justify-center mt-2">
                            <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="mx-2 "> <FaLinkedin size={24} /></a>
                            <a href={founder.github} target="_blank" rel="noopener noreferrer" className="mx-2"><FaGithub size={24} /></a>
                            <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className='mx-2'><FaTwitter size={24} /></a>
                            <a href={founder.instagram} target="_blank" rel="noopener noreferrer" className='mx-2'><FaInstagram size={24} /></a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;
