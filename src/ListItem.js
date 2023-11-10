export class ListItem {
    constructor(dom) {
        /** 列表项 */
        this.dom = dom;
        /** 折叠时需要被隐藏的子列表 */
        this.childList = dom.lastElementChild;
        /** 是否已经折叠 */
        this._hasFold = false;
    }

    get hasFold() {
        return this._hasFold;
    }

    fold() {
        this.childList.style.display = 'none';
        this._hasFold = true;
    }

    expand() {
        this.childList.style.display = '';
        this._hasFold = false;
    }

    patchStyle() {
        this.dom.classList.add('acfold__foldable-li');
    }

    patchClickEvent() {
        // 用事件委托模式写出来的不好看，所以不用
        this.dom.addEventListener('click', function (e) {
            const __acFold = e.currentTarget.__acFold;
            if (__acFold.hasFold) {
                __acFold.expand();
            } else {
                __acFold.fold();
            }
            e.stopPropagation();
        });
    }
}