import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import {faDatabase, faServer} from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    // create tailwind login form
    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-semibold text-blue-600">Welcome to My Project</h1>
                <p className="text-xl text-gray-700 mt-4">
                    This is a Next.js project using Tailwind CSS for styling.
                </p>
            </div>
            <div className="flex flex-wrap mt-12">
                <div className="px-4 py-2 m-2 text-center">
                    <FontAwesomeIcon
                        icon={faReact}
                        className="text-6xl text-blue-600"
                    />
                    <p className="text-sm text-gray-600">React</p>
                </div>
                <div className="px-4 py-2 m-2 text-center">
                    <FontAwesomeIcon
                        icon={faServer}
                        className="text-6xl text-blue-600"
                    />
                    <p className="text-sm text-gray-600">Node.js</p>
                </div>
                <div className="px-4 py-2 m-2 text-center">
                    <FontAwesomeIcon
                        icon={faDatabase}
                        className="text-6xl text-blue-600"
                    />
                    <p className="text-sm text-gray-600">MongoDB</p>
                </div>
            </div>
            <div className="flex flex-col items-center mt-12">
                <a href="https://github.com/oleg-kuibar/code-coverage-monitor"
                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">View on GitHub</a>
            </div>
        </div>
    );
}
