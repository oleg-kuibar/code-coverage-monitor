// login layout with tailwindcss
import React from 'react';

export default function LoginLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-32">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        style={{backgroundImage: "url('https://source.unsplash.com/kGUmNEYaSMY/600x800')"}}
                    />
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        {children}
                        <p className="text-xs text-center text-gray-500">
                            &copy;2022 Lawyer Corner. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}