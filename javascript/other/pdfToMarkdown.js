const pdf2html = require('pdf2html');
const fs = require('fs/promises');
const path = require('path');
const TurndownService = require('turndown');

const turndownService = new TurndownService();

const pdfToHtmlReader = async (filepath) => await pdf2html.html(`${filepath}.pdf`);

const htmlToMarkdownReader = async (htmlContent) => turndownService.turndown(htmlContent);

const fileWriter = async (filepath, content) => {
    await fs.writeFile(filepath, content);
    return filepath
}

const removeFiletype = (filepath, filetype) =>
    filepath.replace(new RegExp(String.raw`.${filetype}$`, "g"), '')

const getFiles = async (directory, filetype) => {
    const foundFiles = await fs.readdir(path.resolve(__dirname, directory), {withFileTypes: true})

    return foundFiles
        .filter((file) => file.name.includes(filetype))
        .map((file) => path.resolve(__dirname, `${directory}/${removeFiletype(file.name, 'pdf')}`))
}

const mainBuilder = (fileFetcher, toHTML, toMarkdown, toFile) => async (directory) => {
    const [foundFile, ] = await fileFetcher(directory, 'pdf');

    const convertedFiles = [foundFile]
        .map((filepath) =>
            toHTML(filepath)
                .then((htmlContent) => toMarkdown(htmlContent))
                .then((markdownContent) => toFile(`${filepath}.md`, markdownContent)))

    return Promise.all(convertedFiles)
}

const main = mainBuilder(getFiles, pdfToHtmlReader, htmlToMarkdownReader, fileWriter)

main('notes').then((results) => {
  console.log(results.length);
})
