const textToHtml = (text)=> {
    if (text === null || text === undefined){
        return text;
    }

    return text.split('\n').join('<br/>');
}

const htmlToInlineText = (html)=> {
    return html.replaceAll("<br/>"," ");
}

const htmlToText = (html)=> {
    return html.replaceAll("<br/>","\n");
}
export {textToHtml,htmlToInlineText,htmlToText}