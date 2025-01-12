import { spawn } from "child_process";
import path from "path";

export const predict = (inputData: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, "../../predict.py");
        const pythonProcess = spawn("python", [scriptPath]);

        pythonProcess.stdin.write(JSON.stringify(inputData));
        pythonProcess.stdin.end();

        let data = "";
        pythonProcess.stdout.on("data", (chunk) => {
            data += chunk;
        });

        pythonProcess.stderr.on("data", (chunk) => {
            console.error(`stderr: ${chunk}`);
        });

        pythonProcess.on("close", (code) => {
            if (code !== 0) {
                return reject(
                    new Error(`Python script exited with code ${code}`)
                );
            }
            resolve(JSON.parse(data));
        });
    });
};
