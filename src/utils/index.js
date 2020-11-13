export function palette(obj, props, separator = '|') {
    return Object.entries(obj)
        .map(value => {
            const [key, colors] = value;

            let _colors = colors.split(separator).map(s => s.trim()).filter(Boolean);
            let _props = props.split(separator).map(s => s.trim()).filter(Boolean)
            
            return _colors.map((color, i) => `--${key}-${_props[i]}: ${color}`)
                .join('; ')
        }).join('; ')
}

export function selectText(node) {
    node = document.getElementById(node);

    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }

    document.execCommand('copy')
}

export function processAuthors(authors) {
    if (!authors) return;

    let res = authors.split(",")
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
                let abbr = names.map(name => name[0] ? name[0].toUpperCase() + '.' : name);
                return lastName + ', ' + abbr.join(' ')
            }
        })
    
    return res.length < 3 ? res.join('; ') : res[0] + ' et al.'
}