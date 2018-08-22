import { Injectable, Component, ElementRef, Input, PLATFORM_ID, Inject, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Renderer, setOptions, parse } from 'marked';
import { isPlatformBrowser } from '@angular/common';
import { highlightAll } from 'prismjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMdService {
    /**
     * @param {?} _http
     */
    constructor(_http) {
        this._http = _http;
        this._renderer = new Renderer();
        this.extendRenderer();
        this.setMarkedOptions({});
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getContent(path) {
        return this._http.get(path, { responseType: 'text' }).pipe(map(res => res), catchError(this.handleError));
    }
    /**
     * @return {?}
     */
    get renderer() {
        return this._renderer;
    }
    /**
     * @param {?} res
     * @return {?}
     */
    extractData(res) {
        return res.text() || '';
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setMarkedOptions(options) {
        options = Object.assign({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        }, options);
        options.renderer = this._renderer;
        setOptions(options);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    compile(data) {
        return parse(data);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        /** @type {?} */
        let errMsg;
        if (error instanceof fetch) {
            /** @type {?} */
            const body = error.json() || '';
            /** @type {?} */
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return throwError(errMsg);
    }
    /**
     * @return {?}
     */
    extendRenderer() {
        this._renderer.listitem = function (text) {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(/^\s*\[ \]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " disabled> ')
                    .replace(/^\s*\[x\]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " checked disabled> ');
                return '<li style="list-style: none">' + text + '</li>';
            }
            else {
                return '<li>' + text + '</li>';
            }
        };
    }
}
NgxMdService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
NgxMdService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ NgxMdService.ngInjectableDef = defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(inject(HttpClient)); }, token: NgxMdService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMdComponent {
    /**
     * @param {?} _mdService
     * @param {?} _el
     * @param {?} platformId
     */
    constructor(_mdService, _el, platformId) {
        this._mdService = _mdService;
        this._el = _el;
        this.platformId = platformId;
        this.changeLog = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set path(value) {
        if (value) {
            this._path = value;
            this.onPathChange();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        if (value) {
            this._data = value;
            this.onDataChange(value);
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    onDataChange(data) {
        if (data) {
            this._el.nativeElement.innerHTML = this._mdService.compile(data);
        }
        else {
            this._el.nativeElement.innerHTML = '';
        }
        this.highlightContent(false);
    }
    /**
     *  After view init
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._path) {
            this.onPathChange();
        }
        else if (!this._data) {
            this.processRaw();
        }
    }
    /**
     * @return {?}
     */
    processRaw() {
        this._md = this.prepare(decodeHtml(this._el.nativeElement.innerHTML));
        this._el.nativeElement.innerHTML = this._mdService.compile(this._md);
        this.highlightContent(false);
    }
    /**
     * get remote conent;
     * @return {?}
     */
    onPathChange() {
        this._ext = this._path && this._path.split('.').splice(-1).join();
        this._mdService.getContent(this._path)
            .subscribe(data => {
            this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
            this._el.nativeElement.innerHTML = this._mdService.compile(this.prepare(this._md));
            this.highlightContent(false);
        }, err => this.handleError);
    }
    /**
     * catch http error
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    /**
     * Prepare string
     * @param {?} raw
     * @return {?}
     */
    prepare(raw) {
        if (!raw) {
            return '';
        }
        if (this._ext === 'md' || !this.path) {
            /** @type {?} */
            let isCodeBlock = false;
            return raw.split('\n').map((line) => {
                if (this.trimLeft(line).substring(0, 3) === '```') {
                    isCodeBlock = !isCodeBlock;
                }
                return isCodeBlock ? line : line.trim();
            }).join('\n');
        }
        return raw.replace(/\"/g, '\'');
    }
    /**
     * Trim left whitespace
     * @param {?} line
     * @return {?}
     */
    trimLeft(line) {
        return line.replace(/^\s+|\s+$/g, '');
    }
    /**
     * Use Prism to highlight code snippets only on the browser
     * @param {?} async
     * @return {?}
     */
    highlightContent(async) {
        if (isPlatformBrowser(this.platformId)) {
            highlightAll(async);
        }
    }
}
NgxMdComponent.decorators = [
    { type: Component, args: [{
                selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
                template: '<ng-content></ng-content>',
                styles: [
                    `.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
            background: none;
        }`
                ]
            },] },
];
/** @nocollapse */
NgxMdComponent.ctorParameters = () => [
    { type: NgxMdService },
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NgxMdComponent.propDecorators = {
    path: [{ type: Input }],
    data: [{ type: Input }]
};
/**
 * @param {?} html
 * @return {?}
 */
function decodeHtml(html) {
    /** @type {?} */
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMdConfig {
}
NgxMdConfig.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMdModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgxMdModule,
            providers: [NgxMdConfig]
        };
    }
}
NgxMdModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                declarations: [NgxMdComponent],
                providers: [NgxMdService],
                exports: [NgxMdComponent],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxMdService, NgxMdComponent, NgxMdModule, NgxMdConfig as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5jb21wb25lbnQudHMiLCJuZzovL25neC1tZC9saWIvbmd4LW1kLmNvbmZpZy50cyIsIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyB0aHJvd0Vycm9yLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcydcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBSZW5kZXJlciwgc2V0T3B0aW9ucywgcGFyc2UgfSBmcm9tICdtYXJrZWQnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9yZW5kZXJlcjogYW55ID0gbmV3IFJlbmRlcmVyKCk7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgdGhpcy5leHRlbmRSZW5kZXJlcigpO1xyXG4gICAgdGhpcy5zZXRNYXJrZWRPcHRpb25zKHt9KTtcclxuICB9XHJcblxyXG4gIC8vIGdldCB0aGUgY29udGVudCBmcm9tIHJlbW90ZSByZXNvdXJjZVxyXG4gIGdldENvbnRlbnQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHBhdGgsIHtyZXNwb25zZVR5cGU6ICd0ZXh0J30pLnBpcGUobWFwKHJlcyA9PiByZXMpLCBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKVxyXG4gIH1cclxuXHJcbiAgIHB1YmxpYyBnZXQgcmVuZGVyZXIoKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyO1xyXG4gICB9XHJcblxyXG4gICAvLyBoYW5kbGUgZGF0YVxyXG4gICBwdWJsaWMgZXh0cmFjdERhdGEocmVzOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgIHJldHVybiByZXMudGV4dCgpIHx8ICcnO1xyXG4gICB9XHJcblxyXG4gICBwdWJsaWMgc2V0TWFya2VkT3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICBnZm06IHRydWUsXHJcbiAgICAgICB0YWJsZXM6IHRydWUsXHJcbiAgICAgICBicmVha3M6IGZhbHNlLFxyXG4gICAgICAgcGVkYW50aWM6IGZhbHNlLFxyXG4gICAgICAgc2FuaXRpemU6IGZhbHNlLFxyXG4gICAgICAgc21hcnRMaXN0czogdHJ1ZSxcclxuICAgICAgIHNtYXJ0eXBhbnRzOiBmYWxzZVxyXG4gICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgIG9wdGlvbnMucmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcclxuICAgICBzZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICB9XHJcblxyXG4gICAvLyBjb21wbGUgbWFya2Rvd24gdG8gaHRtbFxyXG4gICBwdWJsaWMgY29tcGlsZShkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlKGRhdGEpO1xyXG4gICB9XHJcblxyXG4gICAvLyBoYW5kbGUgZXJyb3JcclxuICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogYW55IHtcclxuICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XHJcbiAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgZmV0Y2gpIHtcclxuICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XHJcbiAgICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgZXJyTXNnID0gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCAnJ30gJHtlcnJ9YDtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xyXG4gICAgIH1cclxuICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJNc2cpO1xyXG4gICB9XHJcblxyXG4gICAvLyBleHRlbmQgbWFya2VkIHJlbmRlciB0byBzdXBwb3J0IHRvZG8gY2hlY2tib3hcclxuICAgcHJpdmF0ZSBleHRlbmRSZW5kZXJlcigpIHtcclxuICAgICB0aGlzLl9yZW5kZXJlci5saXN0aXRlbSA9IGZ1bmN0aW9uKHRleHQ6IHN0cmluZykge1xyXG4gICAgICBpZiAoL15cXHMqXFxbW3ggXVxcXVxccyovLnRlc3QodGV4dCkpIHtcclxuICAgICAgdGV4dCA9IHRleHRcclxuICAgICAgICAucmVwbGFjZSgvXlxccypcXFsgXFxdXFxzKi8sICc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgc3R5bGU9XCIgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgbWFyZ2luOiAwIDAuMmVtIDAuMjVlbSAtMS42ZW07IGZvbnQtc2l6ZTogMTZweDsgXCIgZGlzYWJsZWQ+ICcpXHJcbiAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbeFxcXVxccyovLCAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHN0eWxlPVwiIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtOyBmb250LXNpemU6IDE2cHg7IFwiIGNoZWNrZWQgZGlzYWJsZWQ+ICcpO1xyXG4gICAgICAgICAgcmV0dXJuICc8bGkgc3R5bGU9XCJsaXN0LXN0eWxlOiBub25lXCI+JyArIHRleHQgKyAnPC9saT4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gJzxsaT4nICsgdGV4dCArICc8L2xpPic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICB9XHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hNZFNlcnZpY2UgfSBmcm9tICcuL25neC1tZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgKiBhcyBQcmlzbSBmcm9tICdwcmlzbWpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdtYXJrZG93bixbTWFya2Rvd25dLG5neC1tZCxbTmd4TWRdJyxcclxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbiAgICBzdHlsZXM6IFtcclxuICAgICAgICBgLnRva2VuLm9wZXJhdG9yLCAudG9rZW4uZW50aXR5LCAudG9rZW4udXJsLCAubGFuZ3VhZ2UtY3NzIC50b2tlbi5zdHJpbmcsIC5zdHlsZSAudG9rZW4uc3RyaW5nIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgICAgICB9YFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWRDb21wb25lbnQgaW1wbGVtZW50cyAgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9kYXRhOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9tZDogYW55O1xyXG4gICAgcHJpdmF0ZSBfZXh0OiBzdHJpbmc7XHJcbiAgICBjaGFuZ2VMb2c6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfbWRTZXJ2aWNlOiBOZ3hNZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBzdHJpbmdcclxuICAgICkgeyB9XHJcblxyXG4gICBcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHBhdGgodmFsdWU6IHN0cmluZykge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9wYXRoID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vblBhdGhDaGFuZ2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgZGF0YSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gb24gaW5wdXRcclxuICAgIG9uRGF0YUNoYW5nZShkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKGRhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5oaWdobGlnaHRDb250ZW50KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBBZnRlciB2aWV3IGluaXRcclxuICAgICAqL1xyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICBpZiAodGhpcy5fcGF0aCkge1xyXG4gICAgICAgIHRoaXMub25QYXRoQ2hhbmdlKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2RhdGEpIHtcclxuICAgICAgICB0aGlzLnByb2Nlc3NSYXcoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NSYXcoKSB7XHJcbiAgICAgIHRoaXMuX21kID0gdGhpcy5wcmVwYXJlKGRlY29kZUh0bWwodGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwpKTtcclxuICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZSh0aGlzLl9tZCk7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgcmVtb3RlIGNvbmVudDtcclxuICAgICAqL1xyXG4gICAgb25QYXRoQ2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuX2V4dCA9IHRoaXMuX3BhdGggJiYgdGhpcy5fcGF0aC5zcGxpdCgnLicpLnNwbGljZSgtMSkuam9pbigpO1xyXG4gICAgICAgIHRoaXMuX21kU2VydmljZS5nZXRDb250ZW50KHRoaXMuX3BhdGgpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tZCA9IHRoaXMuX2V4dCAhPT0gJ21kJyA/ICdgYGAnICsgdGhpcy5fZXh0ICsgJ1xcbicgKyBkYXRhICsgJ1xcbmBgYCcgOiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZSh0aGlzLnByZXBhcmUodGhpcy5fbWQpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhdGNoIGh0dHAgZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZXBhcmUgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgICBwcmVwYXJlKHJhdzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFyYXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZXh0ID09PSAnbWQnIHx8ICF0aGlzLnBhdGgpIHtcclxuICAgICAgICAgICAgbGV0IGlzQ29kZUJsb2NrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiByYXcuc3BsaXQoJ1xcbicpLm1hcCgobGluZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltTGVmdChsaW5lKS5zdWJzdHJpbmcoMCwgMykgPT09ICdgYGAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDb2RlQmxvY2sgPSAhaXNDb2RlQmxvY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNDb2RlQmxvY2sgPyBsaW5lIDogbGluZS50cmltKCk7XHJcbiAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF3LnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpbSBsZWZ0IHdoaXRlc3BhY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmltTGVmdChsaW5lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gbGluZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgUHJpc20gdG8gaGlnaGxpZ2h0IGNvZGUgc25pcHBldHMgb25seSBvbiB0aGUgYnJvd3NlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhpZ2hsaWdodENvbnRlbnQoYXN5bmM6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgICBQcmlzbS5oaWdobGlnaHRBbGwoYXN5bmMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlY29kZUh0bWwoaHRtbDogc3RyaW5nKSB7IC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83Mzk0Nzg3LzU4ODUyMVxyXG4gICAgY29uc3QgdHh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcclxuICAgIHR4dC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgcmV0dXJuIHR4dC52YWx1ZTtcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmd4TWRDb25maWcge1xyXG4gIC8qKiBjb25maWcgbW9kdWUgKi9cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgTmd4TWRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtbWQuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neE1kQ29uZmlnIH0gZnJvbSAnLi9uZ3gtbWQuY29uZmlnJztcclxuaW1wb3J0IHsgTmd4TWRDb21wb25lbnQgfSBmcm9tICcuL25neC1tZC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4TWRDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW05neE1kU2VydmljZV0sXHJcbiAgZXhwb3J0czogW05neE1kQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1kTW9kdWxlIHtcclxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTmd4TWRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW05neE1kQ29uZmlnXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlByaXNtLmhpZ2hsaWdodEFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFXRSxZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO3lCQURaLElBQUksUUFBUSxFQUFFO1FBRXJDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBR0QsVUFBVSxDQUFDLElBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7S0FDMUc7Ozs7UUFFVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O0lBSWpCLFdBQVcsQ0FBQyxHQUFRO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Ozs7O0lBR25CLGdCQUFnQixDQUFDLE9BQVk7UUFDbEMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdEIsR0FBRyxFQUFFLElBQUk7WUFDVCxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDWixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7SUFJZixPQUFPLENBQUMsSUFBWTtRQUN4QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0lBSWQsV0FBVyxDQUFDLEtBQVU7O1FBQzVCLElBQUksTUFBTSxDQUFTO1FBQ25CLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTs7WUFDMUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzs7WUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLE1BQU0sS0FBSyxDQUFDLFVBQVUsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7U0FDL0Q7YUFBTTtZQUNMLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7O0lBSXBCLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBUyxJQUFZO1lBQzlDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLEdBQUcsSUFBSTtxQkFDUixPQUFPLENBQUMsY0FBYyxFQUFFLHFIQUFxSCxDQUFDO3FCQUM5SSxPQUFPLENBQUMsY0FBYyxFQUFFLDZIQUE2SCxDQUFDLENBQUM7Z0JBQ3RKLE9BQU8sK0JBQStCLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxPQUFPLE1BQU0sR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ2hDO1NBQ0YsQ0FBQzs7OztZQW5FUCxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFQUSxVQUFVOzs7Ozs7OztBQ0FuQjs7Ozs7O0lBcUJJLFlBQ1ksWUFDQSxLQUNxQixVQUFrQjtRQUZ2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLFFBQUcsR0FBSCxHQUFHO1FBQ2tCLGVBQVUsR0FBVixVQUFVLENBQVE7eUJBTDdCLEVBQUU7S0FNbkI7Ozs7O0lBSUwsSUFDSSxJQUFJLENBQUMsS0FBYTtRQUNwQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtLQUNGOzs7OztJQUVELElBQ0ksSUFBSSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0tBQ0Y7Ozs7O0lBSUQsWUFBWSxDQUFDLElBQVk7UUFDdkIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDdkM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7Ozs7O0lBS0QsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtLQUNGOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5Qjs7Ozs7SUFLRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDakMsU0FBUyxDQUFDLElBQUk7WUFDWCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNqRixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEMsRUFDRCxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2hDOzs7Ozs7SUFLTyxXQUFXLENBQUMsS0FBVTtRQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0lBTWpELE9BQU8sQ0FBQyxHQUFXO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7O1lBQ2xDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN4QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBWTtnQkFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUMvQyxXQUFXLEdBQUcsQ0FBQyxXQUFXLENBQUM7aUJBQzlCO2dCQUNELE9BQU8sV0FBVyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtRQUNELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbkM7Ozs7OztJQUtPLFFBQVEsQ0FBQyxJQUFZO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7SUFNbEMsZ0JBQWdCLENBQUMsS0FBYztRQUNyQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0Q0EsWUFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjs7OztZQTFITixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsTUFBTSxFQUFFO29CQUNKOztVQUVFO2lCQUNMO2FBQ0o7Ozs7WUFaUSxZQUFZO1lBREQsVUFBVTt5Q0F3QnJCLE1BQU0sU0FBQyxXQUFXOzs7bUJBS3RCLEtBQUs7bUJBUUwsS0FBSzs7Ozs7O0FBOEZWLG9CQUFvQixJQUFZOztJQUM1QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztDQUNwQjs7Ozs7O0FDeElEOzs7WUFFQyxVQUFVOzs7Ozs7O0FDRlg7Ozs7SUFhUyxPQUFPLE9BQU87UUFDbkIsT0FBTztZQUNMLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN6QixDQUFDOzs7O1lBWEwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzlCLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDekIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzFCOzs7Ozs7Ozs7Ozs7Ozs7In0=