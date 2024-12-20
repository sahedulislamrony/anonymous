import chalk from "chalk";
import { execSync } from "child_process";
import process from "process";
import readline from "readline";

const run = (command) => {
    try {
        process.stdout.write(chalk.bold.gray(`> : ${command}\n`));
        execSync(command, { stdio: "inherit" });
    } catch (error) {
        process.stdout.write(chalk.red(`Error: ${error.message}`));
        process.exit(1);
    }
};

const ask = (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        const coloredQuery = `${chalk.green(query)} [${chalk.bold.green(
            "y",
        )}/${chalk.red("n")}]: `;
        rl.question(coloredQuery, (answer) => {
            rl.close();

            const normalizedAnswer = answer.trim().toLowerCase();
            if (["y", "yes"].includes(normalizedAnswer)) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

const main = async () => {
    run("git add . && git commit");
    const shouldPush = await ask(
        "Do you want to push to your main branch (remote)?",
    );

    // Act based on user input
    if (shouldPush) {
        run("git push -u origin main");
        process.stdout.write(chalk.green("Changes were pushed successfully.\n"));
    } else {
        console.log(chalk.yellow("Aborted. No changes were pushed."));
    }
};

main();