import fs from "node:fs";

import { Preferences } from "./preferences";
import { Command } from "commander";
import { PDFDocument, rgb } from "pdf-lib";
import moment, { Moment } from "moment";
import { validateDateValue, validateIntegerValue } from "./validators";

// Read package.json file
export const packageJson = JSON.parse(
  fs.readFileSync("./package.json", "utf8")
);

export const preferences = new Preferences();
const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("init")
  .requiredOption(
    "-n, --name <name>",
    "Specify the name to be printed on invoices. Example: João"
  )
  .requiredOption<number>(
    "-d, --generationDay <day>",
    "Set the default generation day for invoices. If the schedule option is enabled, the invoice will be generated on this day. Example: 7 or 22",
    validateIntegerValue
  )
  .option<number>(
    "-i, --invoiceNumber <invoiceNumber>",
    "Set the initial invoice number. Example: 95",
    validateIntegerValue
  )
  .action((options) => {
    initialization(
      options.generationDay,
      options.name,
      options.invoiceNumber ?? 0
    );
  });

program
  .command("gen")
  .option<Moment>(
    "-d, --date <date>",
    "Select a custom date",
    validateDateValue
  )
  .action((options) => {
    if (preferences.firstRun) {
      console.log(
        "There are some pending settings. Run the initialization (init) command first."
      );
      return;
    }
    const customDate: Moment | undefined = options.date;
    generateInvoice(customDate).catch((reason) => console.log(reason));
  });

// Initialization
function initialization(
  generationDay: number,
  name: string,
  invoiceNumber: number = 0
) {
  if (preferences.firstRun) preferences.firstRun = false;
  preferences.generationDay = generationDay;
  preferences.invoiceNumber = invoiceNumber;
  preferences.name = name;
  console.log("You have successfully set the initial settings.");
}

program.parse(process.argv);

async function generateInvoice(customDate: Moment | undefined) {
  const templatePdfBytes = fs.readFileSync("./assets/model.pdf");

  const pdfDoc = await PDFDocument.load(templatePdfBytes);
  const page = pdfDoc.getPage(0);
  const defaultColor = rgb(0.36, 0.36, 0.36);
  const invoiceNumber = preferences.invoiceNumber;
  /// GOD HELP ME
  preferences.invoiceNumber = parseInt(invoiceNumber.toString()) + 1;

  /// CHANGE THIS TO CURRENT
  const date = customDate ?? moment();

  page.drawText(invoiceNumber.toString().padStart(6, "0"), {
    x: 44,
    y: 433,
    color: defaultColor,
    size: 10,
  });

  page.drawText(date.format("MM/DD/YYYY"), {
    x: 44,
    y: 403,
    color: defaultColor,
    size: 10,
  });

  page.drawText(date.format("MMMM") + " Salary", {
    x: 168,
    y: 467,
    color: defaultColor,
    size: 10,
  });

  const modifiedPdfBytes = await pdfDoc.save();

  fs.writeFileSync(
    "build/invoice_" + date.format("MMMM") + "_joao_baroni.pdf",
    modifiedPdfBytes
  );
}
