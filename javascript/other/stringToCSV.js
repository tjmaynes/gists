const stringToCSV = (data) => 
    data
        .split("\n")
        .filter(d => d != '')
        .map(d => d.split("-"))
        .filter(d => d.length > 1)
        .map(d => {
            const bookName = JSON.stringify(d[0])
                .replaceAll("\"", "")
                .trimEnd();
            const [, ...rawAuthors] = d;
            const authors = rawAuthors[0]
                .replaceAll('and ', '')
                .trimStart()
                .trimEnd();
            return `${bookName}, "${authors}"`;
        })
        .join("\r\n");
