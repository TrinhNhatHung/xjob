const textToHtml = (text)=> {
    if (text === null || text === undefined){
        return text;
    }

    return text.split('\n').join('\n<br/>\n');
}

const htmlToInlineText = (html)=> {
    return html.replaceAll("<br/>"," ");
}

export {textToHtml,htmlToInlineText}