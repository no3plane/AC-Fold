import { ListItem } from './ListItem.js';

function main() {
    injectCSS();

    const lis = [...document.querySelectorAll('li')];
    const foldableLis = lis.filter(foldable);

    foldableLis.forEach((li) => (li.__acFold = new ListItem(li)));
    foldableLis.forEach((li) => li.__acFold.patchStyle());
    foldableLis.forEach((li) => li.__acFold.patchClickEvent());
}

function injectCSS() {
    const cssRule = `
        .acfold__foldable-li {
            position: relative;
        }
        .acfold__foldable-li:hover::before {
            content: '';
            position: absolute;
            top: 0;
            left: -36px;
            width: 8px;
            height: 8px;
            border: solid black;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    `;
    const styleNode = document.createElement('style');
    const textNode = document.createTextNode(cssRule);
    styleNode.appendChild(textNode);
    document.head.appendChild(styleNode);
}

function foldable(li) {
    if (li.firstElementChild.tagName !== 'SPAN') {
        return false;
    }
    if (li.lastElementChild.tagName !== 'OL') {
        return false;
    }
    return true;
}

main();
