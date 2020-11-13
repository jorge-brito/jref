const References = {
    /**
     * Params:
     * 
     *      type params = {
     *          authors: string;
     *          title: string;
     *          subtitle?: string;
     *          edition?: string;
     *          location: string;
     *          editor: string;
     *          date: Date;
     *      }
     */
    'book-w/-authors': (params) => {
        let result = "";
        let pAuthors = params.authors;
        let { title, subtitle, location, editor, date, edition } = params;

        title = title || ""
        location = location || ""
        editor = editor || ""
        date = date || ""

        if (pAuthors && typeof pAuthors == 'string') {
            let authors = pAuthors.split(",")
                .map(s => s.trim())
                .filter(Boolean)
                .map(author => {
                    let names = author.split(' ').filter(name => {
                        return !['de', 'da', 'das', 'do', 'das', 'dos'].includes(name)
                    });
                    if (names.length == 1) 
                        return names[0].toUpperCase();
                    else {
                        let lastName = names.pop().toUpperCase();
                        let abbr = names.map(name => name[0].toUpperCase() + '.');
                        return lastName + ', ' + abbr.join(' ')
                    }
                })
            if (authors.length < 3)
                result += authors.join('; ');
            else
                result += authors[0] + ' et al.'
        }

        if (result.endsWith('.'))
            result += ` <b>${title}`
        else
            result += `. <b>${title}`

        if (subtitle)
            result += ': ' + subtitle + '</b>. '
        else
            result += '</b>. '
        
        if (edition)
            result += edition + '. '
        
        result += `${location}: <i>${editor}</i>, ${date}.`

        return result;

    }
}

export function Reference(type, params) {
    return References[type](params);
}