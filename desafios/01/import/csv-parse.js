import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath)

// Initialize the parser
const parser = parse({
  delimiter: ',',
  fromLine: 2,
  skipEmptyLines: true,
});

// Use the readable stream api to consume records
async function importTasks() {
  const linesParse = stream.pipe(parser)

  for await (const line of linesParse) {
    const [title, description ] = line

    console.log(JSON.stringify(line));

    await fetch('http://localhost:3333/tasks' ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })

    await wait(1000)
  }
}

importTasks()

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
