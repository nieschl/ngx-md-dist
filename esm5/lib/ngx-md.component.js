/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, PLATFORM_ID, Inject } from '@angular/core';
import { NgxMdService } from './ngx-md.service';
import { isPlatformBrowser } from '@angular/common';
import * as Prism from 'prismjs';
var NgxMdComponent = /** @class */ (function () {
    function NgxMdComponent(_mdService, _el, platformId) {
        this._mdService = _mdService;
        this._el = _el;
        this.platformId = platformId;
        this.changeLog = [];
    }
    Object.defineProperty(NgxMdComponent.prototype, "path", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._path = value;
                this.onPathChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMdComponent.prototype, "data", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._data = value;
                this.onDataChange(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    // on input
    /**
     * @param {?} data
     * @return {?}
     */
    NgxMdComponent.prototype.onDataChange = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data) {
            this._el.nativeElement.innerHTML = this._mdService.compile(data);
        }
        else {
            this._el.nativeElement.innerHTML = '';
        }
        this.highlightContent(false);
    };
    /**
     *  After view init
     */
    /**
     *  After view init
     * @return {?}
     */
    NgxMdComponent.prototype.ngAfterViewInit = /**
     *  After view init
     * @return {?}
     */
    function () {
        if (this._path) {
            this.onPathChange();
        }
        else if (!this._data) {
            this.processRaw();
        }
    };
    /**
     * @return {?}
     */
    NgxMdComponent.prototype.processRaw = /**
     * @return {?}
     */
    function () {
        this._md = this.prepare(decodeHtml(this._el.nativeElement.innerHTML));
        this._el.nativeElement.innerHTML = this._mdService.compile(this._md);
        this.highlightContent(false);
    };
    /**
     * get remote conent;
     */
    /**
     * get remote conent;
     * @return {?}
     */
    NgxMdComponent.prototype.onPathChange = /**
     * get remote conent;
     * @return {?}
     */
    function () {
        var _this = this;
        this._ext = this._path && this._path.split('.').splice(-1).join();
        this._mdService.getContent(this._path)
            .subscribe(function (data) {
            _this._md = _this._ext !== 'md' ? '```' + _this._ext + '\n' + data + '\n```' : data;
            _this._el.nativeElement.innerHTML = _this._mdService.compile(_this.prepare(_this._md));
            _this.highlightContent(false);
        }, function (err) { return _this.handleError; });
    };
    /**
     * catch http error
     * @param {?} error
     * @return {?}
     */
    NgxMdComponent.prototype.handleError = /**
     * catch http error
     * @param {?} error
     * @return {?}
     */
    function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    /**
     * Prepare string
     */
    /**
     * Prepare string
     * @param {?} raw
     * @return {?}
     */
    NgxMdComponent.prototype.prepare = /**
     * Prepare string
     * @param {?} raw
     * @return {?}
     */
    function (raw) {
        var _this = this;
        if (!raw) {
            return '';
        }
        if (this._ext === 'md' || !this.path) {
            /** @type {?} */
            var isCodeBlock_1 = false;
            return raw.split('\n').map(function (line) {
                if (_this.trimLeft(line).substring(0, 3) === '```') {
                    isCodeBlock_1 = !isCodeBlock_1;
                }
                return isCodeBlock_1 ? line : line.trim();
            }).join('\n');
        }
        return raw.replace(/\"/g, '\'');
    };
    /**
     * Trim left whitespace
     * @param {?} line
     * @return {?}
     */
    NgxMdComponent.prototype.trimLeft = /**
     * Trim left whitespace
     * @param {?} line
     * @return {?}
     */
    function (line) {
        return line.replace(/^\s+|\s+$/g, '');
    };
    /**
     * Use Prism to highlight code snippets only on the browser
     * @param {?} async
     * @return {?}
     */
    NgxMdComponent.prototype.highlightContent = /**
     * Use Prism to highlight code snippets only on the browser
     * @param {?} async
     * @return {?}
     */
    function (async) {
        if (isPlatformBrowser(this.platformId)) {
            Prism.highlightAll(async);
        }
    };
    NgxMdComponent.decorators = [
        { type: Component, args: [{
                    selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
                    template: '<ng-content></ng-content>',
                    styles: [
                        ".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n            background: none;\n        }"
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxMdComponent.ctorParameters = function () { return [
        { type: NgxMdService },
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NgxMdComponent.propDecorators = {
        path: [{ type: Input }],
        data: [{ type: Input }]
    };
    return NgxMdComponent;
}());
export { NgxMdComponent };
if (false) {
    /** @type {?} */
    NgxMdComponent.prototype._path;
    /** @type {?} */
    NgxMdComponent.prototype._data;
    /** @type {?} */
    NgxMdComponent.prototype._md;
    /** @type {?} */
    NgxMdComponent.prototype._ext;
    /** @type {?} */
    NgxMdComponent.prototype.changeLog;
    /** @type {?} */
    NgxMdComponent.prototype._mdService;
    /** @type {?} */
    NgxMdComponent.prototype._el;
    /** @type {?} */
    NgxMdComponent.prototype.platformId;
}
/**
 * @param {?} html
 * @return {?}
 */
function decodeHtml(html) {
    /** @type {?} */
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBeUIsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sS0FBSyxLQUFLLE1BQU0sU0FBUyxDQUFDOztJQWtCN0Isd0JBQ1ksWUFDQSxLQUNxQixVQUFrQjtRQUZ2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLFFBQUcsR0FBSCxHQUFHO1FBQ2tCLGVBQVUsR0FBVixVQUFVLENBQVE7eUJBTDdCLEVBQUU7S0FNbkI7SUFJTCxzQkFDSSxnQ0FBSTs7Ozs7UUFEUixVQUNTLEtBQWE7WUFDcEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCO1NBQ0Y7OztPQUFBO0lBRUQsc0JBQ0ksZ0NBQUk7Ozs7O1FBRFIsVUFDUyxLQUFhO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7U0FDRjs7O09BQUE7SUFHRCxXQUFXOzs7OztJQUNYLHFDQUFZOzs7O0lBQVosVUFBYSxJQUFZO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsR0FBRyxDQUFD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VSxDQUFDLENBQUM7SUFDL0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Q0FDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIElucHV0LCBQTEFURk9STV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neE1kU2VydmljZSB9IGZyb20gJy4vbmd4LW1kLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCAqIGFzIFByaXNtIGZyb20gJ3ByaXNtanMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21hcmtkb3duLFtNYXJrZG93bl0sbmd4LW1kLFtOZ3hNZF0nLFxyXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcclxuICAgIHN0eWxlczogW1xyXG4gICAgICAgIGAudG9rZW4ub3BlcmF0b3IsIC50b2tlbi5lbnRpdHksIC50b2tlbi51cmwsIC5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZywgLnN0eWxlIC50b2tlbi5zdHJpbmcge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgICAgIH1gXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNZENvbXBvbmVudCBpbXBsZW1lbnRzICBBZnRlclZpZXdJbml0IHtcclxuICAgIHByaXZhdGUgX3BhdGg6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2RhdGE6IHN0cmluZztcclxuICAgIHByaXZhdGUgX21kOiBhbnk7XHJcbiAgICBwcml2YXRlIF9leHQ6IHN0cmluZztcclxuICAgIGNoYW5nZUxvZzogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9tZFNlcnZpY2U6IE5neE1kU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IHN0cmluZ1xyXG4gICAgKSB7IH1cclxuXHJcbiAgIFxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgcGF0aCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3BhdGggPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uUGF0aENoYW5nZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBkYXRhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBvbiBpbnB1dFxyXG4gICAgb25EYXRhQ2hhbmdlKGRhdGE6IHN0cmluZykge1xyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUoZGF0YSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEFmdGVyIHZpZXcgaW5pdFxyXG4gICAgICovXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgIGlmICh0aGlzLl9wYXRoKSB7XHJcbiAgICAgICAgdGhpcy5vblBhdGhDaGFuZ2UoKTtcclxuICAgICAgfSBlbHNlIGlmICghdGhpcy5fZGF0YSkge1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc1JhdygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc1JhdygpIHtcclxuICAgICAgdGhpcy5fbWQgPSB0aGlzLnByZXBhcmUoZGVjb2RlSHRtbCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCkpO1xyXG4gICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKHRoaXMuX21kKTtcclxuICAgICAgdGhpcy5oaWdobGlnaHRDb250ZW50KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCByZW1vdGUgY29uZW50O1xyXG4gICAgICovXHJcbiAgICBvblBhdGhDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5fZXh0ID0gdGhpcy5fcGF0aCAmJiB0aGlzLl9wYXRoLnNwbGl0KCcuJykuc3BsaWNlKC0xKS5qb2luKCk7XHJcbiAgICAgICAgdGhpcy5fbWRTZXJ2aWNlLmdldENvbnRlbnQodGhpcy5fcGF0aClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21kID0gdGhpcy5fZXh0ICE9PSAnbWQnID8gJ2BgYCcgKyB0aGlzLl9leHQgKyAnXFxuJyArIGRhdGEgKyAnXFxuYGBgJyA6IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKHRoaXMucHJlcGFyZSh0aGlzLl9tZCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRDb250ZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2F0Y2ggaHR0cCBlcnJvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyb3IpOyAvLyBmb3IgZGVtbyBwdXJwb3NlcyBvbmx5XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlcGFyZSBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgIHByZXBhcmUocmF3OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXJhdykge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9leHQgPT09ICdtZCcgfHwgIXRoaXMucGF0aCkge1xyXG4gICAgICAgICAgICBsZXQgaXNDb2RlQmxvY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIHJhdy5zcGxpdCgnXFxuJykubWFwKChsaW5lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaW1MZWZ0KGxpbmUpLnN1YnN0cmluZygwLCAzKSA9PT0gJ2BgYCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0NvZGVCbG9jayA9ICFpc0NvZGVCbG9jaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0NvZGVCbG9jayA/IGxpbmUgOiBsaW5lLnRyaW0oKTtcclxuICAgICAgICAgICAgfSkuam9pbignXFxuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYXcucmVwbGFjZSgvXFxcIi9nLCAnXFwnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmltIGxlZnQgd2hpdGVzcGFjZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyaW1MZWZ0KGxpbmU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBsaW5lLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZSBQcmlzbSB0byBoaWdobGlnaHQgY29kZSBzbmlwcGV0cyBvbmx5IG9uIHRoZSBicm93c2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGlnaGxpZ2h0Q29udGVudChhc3luYzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgIFByaXNtLmhpZ2hsaWdodEFsbChhc3luYyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVjb2RlSHRtbChodG1sOiBzdHJpbmcpIHsgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzczOTQ3ODcvNTg4NTIxXHJcbiAgICBjb25zdCB0eHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgdHh0LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICByZXR1cm4gdHh0LnZhbHVlO1xyXG59XHJcblxyXG4iXX0=