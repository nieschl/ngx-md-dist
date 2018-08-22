(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('marked'), require('@angular/common'), require('prismjs')) :
    typeof define === 'function' && define.amd ? define('ngx-md', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', 'marked', '@angular/common', 'prismjs'], factory) :
    (factory((global['ngx-md'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,null,global.ng.common,null));
}(this, (function (exports,i0,i1,rxjs,operators,marked,common,Prism) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdService = (function () {
        function NgxMdService(_http) {
            this._http = _http;
            this._renderer = new marked.Renderer();
            this.extendRenderer();
            this.setMarkedOptions({});
        }
        // get the content from remote resource
        /**
         * @param {?} path
         * @return {?}
         */
        NgxMdService.prototype.getContent = /**
         * @param {?} path
         * @return {?}
         */
            function (path) {
                return this._http.get(path, { responseType: 'text' }).pipe(operators.map(function (res) { return res; }), operators.catchError(this.handleError));
            };
        Object.defineProperty(NgxMdService.prototype, "renderer", {
            get: /**
             * @return {?}
             */ function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} res
         * @return {?}
         */
        NgxMdService.prototype.extractData = /**
         * @param {?} res
         * @return {?}
         */
            function (res) {
                return res.text() || '';
            };
        /**
         * @param {?} options
         * @return {?}
         */
        NgxMdService.prototype.setMarkedOptions = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
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
                marked.setOptions(options);
            };
        /**
         * @param {?} data
         * @return {?}
         */
        NgxMdService.prototype.compile = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                return marked.parse(data);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NgxMdService.prototype.handleError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                /** @type {?} */
                var errMsg;
                if (error instanceof fetch) {
                    /** @type {?} */
                    var body = error.json() || '';
                    /** @type {?} */
                    var err = body.error || JSON.stringify(body);
                    errMsg = error.status + " - " + (error.statusText || '') + " " + err;
                }
                else {
                    errMsg = error.message ? error.message : error.toString();
                }
                return rxjs.throwError(errMsg);
            };
        /**
         * @return {?}
         */
        NgxMdService.prototype.extendRenderer = /**
         * @return {?}
         */
            function () {
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
            };
        NgxMdService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgxMdService.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ NgxMdService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(i0.inject(i1.HttpClient)); }, token: NgxMdService, providedIn: "root" });
        return NgxMdService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdComponent = (function () {
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
             */ function (value) {
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
             */ function (value) {
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
                if (common.isPlatformBrowser(this.platformId)) {
                    Prism.highlightAll(async);
                }
            };
        NgxMdComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
                        template: '<ng-content></ng-content>',
                        styles: [
                            ".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n            background: none;\n        }"
                        ]
                    },] },
        ];
        /** @nocollapse */
        NgxMdComponent.ctorParameters = function () {
            return [
                { type: NgxMdService },
                { type: i0.ElementRef },
                { type: String, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
            ];
        };
        NgxMdComponent.propDecorators = {
            path: [{ type: i0.Input }],
            data: [{ type: i0.Input }]
        };
        return NgxMdComponent;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdConfig = (function () {
        function NgxMdConfig() {
        }
        NgxMdConfig.decorators = [
            { type: i0.Injectable },
        ];
        return NgxMdConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdModule = (function () {
        function NgxMdModule() {
        }
        /**
         * @return {?}
         */
        NgxMdModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgxMdModule,
                    providers: [NgxMdConfig]
                };
            };
        NgxMdModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1.HttpClientModule],
                        declarations: [NgxMdComponent],
                        providers: [NgxMdService],
                        exports: [NgxMdComponent],
                    },] },
        ];
        return NgxMdModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgxMdService = NgxMdService;
    exports.NgxMdComponent = NgxMdComponent;
    exports.NgxMdModule = NgxMdModule;
    exports.ɵa = NgxMdConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQuc2VydmljZS50cyIsIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5jb25maWcudHMiLCJuZzovL25neC1tZC9saWIvbmd4LW1kLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgdGhyb3dFcnJvciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUmVuZGVyZXIsIHNldE9wdGlvbnMsIHBhcnNlIH0gZnJvbSAnbWFya2VkJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1kU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IGFueSA9IG5ldyBSZW5kZXJlcigpO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHRoaXMuZXh0ZW5kUmVuZGVyZXIoKTtcclxuICAgIHRoaXMuc2V0TWFya2VkT3B0aW9ucyh7fSk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXQgdGhlIGNvbnRlbnQgZnJvbSByZW1vdGUgcmVzb3VyY2VcclxuICBnZXRDb250ZW50KHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChwYXRoLCB7cmVzcG9uc2VUeXBlOiAndGV4dCd9KS5waXBlKG1hcChyZXMgPT4gcmVzKSwgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKSlcclxuICB9XHJcblxyXG4gICBwdWJsaWMgZ2V0IHJlbmRlcmVyKCkge1xyXG4gICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcclxuICAgfVxyXG5cclxuICAgLy8gaGFuZGxlIGRhdGFcclxuICAgcHVibGljIGV4dHJhY3REYXRhKHJlczogYW55KTogc3RyaW5nIHtcclxuICAgICByZXR1cm4gcmVzLnRleHQoKSB8fCAnJztcclxuICAgfVxyXG5cclxuICAgcHVibGljIHNldE1hcmtlZE9wdGlvbnMob3B0aW9uczogYW55KSB7XHJcbiAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgZ2ZtOiB0cnVlLFxyXG4gICAgICAgdGFibGVzOiB0cnVlLFxyXG4gICAgICAgYnJlYWtzOiBmYWxzZSxcclxuICAgICAgIHBlZGFudGljOiBmYWxzZSxcclxuICAgICAgIHNhbml0aXplOiBmYWxzZSxcclxuICAgICAgIHNtYXJ0TGlzdHM6IHRydWUsXHJcbiAgICAgICBzbWFydHlwYW50czogZmFsc2VcclxuICAgICB9LCBvcHRpb25zKTtcclxuICAgICBvcHRpb25zLnJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XHJcbiAgICAgc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgfVxyXG5cclxuICAgLy8gY29tcGxlIG1hcmtkb3duIHRvIGh0bWxcclxuICAgcHVibGljIGNvbXBpbGUoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZShkYXRhKTtcclxuICAgfVxyXG5cclxuICAgLy8gaGFuZGxlIGVycm9yXHJcbiAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XHJcbiAgICAgbGV0IGVyck1zZzogc3RyaW5nO1xyXG4gICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGZldGNoKSB7XHJcbiAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xyXG4gICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcclxuICAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcclxuICAgICB9XHJcbiAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcclxuICAgfVxyXG5cclxuICAgLy8gZXh0ZW5kIG1hcmtlZCByZW5kZXIgdG8gc3VwcG9ydCB0b2RvIGNoZWNrYm94XHJcbiAgIHByaXZhdGUgZXh0ZW5kUmVuZGVyZXIoKSB7XHJcbiAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGl0ZW0gPSBmdW5jdGlvbih0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgaWYgKC9eXFxzKlxcW1t4IF1cXF1cXHMqLy50ZXN0KHRleHQpKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0XHJcbiAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbIFxcXVxccyovLCAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHN0eWxlPVwiIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtOyBmb250LXNpemU6IDE2cHg7IFwiIGRpc2FibGVkPiAnKVxyXG4gICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcW3hcXF1cXHMqLywgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBzdHlsZT1cIiB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTsgZm9udC1zaXplOiAxNnB4OyBcIiBjaGVja2VkIGRpc2FibGVkPiAnKTtcclxuICAgICAgICAgIHJldHVybiAnPGxpIHN0eWxlPVwibGlzdC1zdHlsZTogbm9uZVwiPicgKyB0ZXh0ICsgJzwvbGk+JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuICc8bGk+JyArIHRleHQgKyAnPC9saT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4TWRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtbWQuc2VydmljZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0ICogYXMgUHJpc20gZnJvbSAncHJpc21qcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWFya2Rvd24sW01hcmtkb3duXSxuZ3gtbWQsW05neE1kXScsXHJcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG4gICAgc3R5bGVzOiBbXHJcbiAgICAgICAgYC50b2tlbi5vcGVyYXRvciwgLnRva2VuLmVudGl0eSwgLnRva2VuLnVybCwgLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLCAuc3R5bGUgLnRva2VuLnN0cmluZyB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICAgICAgfWBcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1kQ29tcG9uZW50IGltcGxlbWVudHMgIEFmdGVyVmlld0luaXQge1xyXG4gICAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZGF0YTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbWQ6IGFueTtcclxuICAgIHByaXZhdGUgX2V4dDogc3RyaW5nO1xyXG4gICAgY2hhbmdlTG9nOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX21kU2VydmljZTogTmd4TWRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogc3RyaW5nXHJcbiAgICApIHsgfVxyXG5cclxuICAgXHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fcGF0aCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25QYXRoQ2hhbmdlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IGRhdGEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2UodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIG9uIGlucHV0XHJcbiAgICBvbkRhdGFDaGFuZ2UoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZShkYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQWZ0ZXIgdmlldyBpbml0XHJcbiAgICAgKi9cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgaWYgKHRoaXMuX3BhdGgpIHtcclxuICAgICAgICB0aGlzLm9uUGF0aENoYW5nZSgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9kYXRhKSB7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzUmF3KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzUmF3KCkge1xyXG4gICAgICB0aGlzLl9tZCA9IHRoaXMucHJlcGFyZShkZWNvZGVIdG1sKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MKSk7XHJcbiAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUodGhpcy5fbWQpO1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJlbW90ZSBjb25lbnQ7XHJcbiAgICAgKi9cclxuICAgIG9uUGF0aENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLl9leHQgPSB0aGlzLl9wYXRoICYmIHRoaXMuX3BhdGguc3BsaXQoJy4nKS5zcGxpY2UoLTEpLmpvaW4oKTtcclxuICAgICAgICB0aGlzLl9tZFNlcnZpY2UuZ2V0Q29udGVudCh0aGlzLl9wYXRoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWQgPSB0aGlzLl9leHQgIT09ICdtZCcgPyAnYGBgJyArIHRoaXMuX2V4dCArICdcXG4nICsgZGF0YSArICdcXG5gYGAnIDogZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUodGhpcy5wcmVwYXJlKHRoaXMuX21kKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYXRjaCBodHRwIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICAgcHJlcGFyZShyYXc6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghcmF3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2V4dCA9PT0gJ21kJyB8fCAhdGhpcy5wYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCBpc0NvZGVCbG9jayA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gcmF3LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpbUxlZnQobGluZSkuc3Vic3RyaW5nKDAsIDMpID09PSAnYGBgJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29kZUJsb2NrID0gIWlzQ29kZUJsb2NrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzQ29kZUJsb2NrID8gbGluZSA6IGxpbmUudHJpbSgpO1xyXG4gICAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhdy5yZXBsYWNlKC9cXFwiL2csICdcXCcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaW0gbGVmdCB3aGl0ZXNwYWNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJpbUxlZnQobGluZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlIFByaXNtIHRvIGhpZ2hsaWdodCBjb2RlIHNuaXBwZXRzIG9ubHkgb24gdGhlIGJyb3dzZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb250ZW50KGFzeW5jOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgICAgUHJpc20uaGlnaGxpZ2h0QWxsKGFzeW5jKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWNvZGVIdG1sKGh0bWw6IHN0cmluZykgeyAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzM5NDc4Ny81ODg1MjFcclxuICAgIGNvbnN0IHR4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICB0eHQuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIHJldHVybiB0eHQudmFsdWU7XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5neE1kQ29uZmlnIHtcclxuICAvKiogY29uZmlnIG1vZHVlICovXHJcblxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE5neE1kU2VydmljZSB9IGZyb20gJy4vbmd4LW1kLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hNZENvbmZpZyB9IGZyb20gJy4vbmd4LW1kLmNvbmZpZyc7XHJcbmltcG9ydCB7IE5neE1kQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtbWQuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW05neE1kQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtOZ3hNZFNlcnZpY2VdLFxyXG4gIGV4cG9ydHM6IFtOZ3hNZENvbXBvbmVudF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNZE1vZHVsZSB7XHJcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5neE1kTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtOZ3hNZENvbmZpZ11cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJSZW5kZXJlciIsIm1hcCIsImNhdGNoRXJyb3IiLCJzZXRPcHRpb25zIiwicGFyc2UiLCJ0aHJvd0Vycm9yIiwiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJpc1BsYXRmb3JtQnJvd3NlciIsIlByaXNtLmhpZ2hsaWdodEFsbCIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJJbmplY3QiLCJQTEFURk9STV9JRCIsIklucHV0IiwiTmdNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFXRSxzQkFBb0IsS0FBaUI7WUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTs2QkFEWixJQUFJQSxlQUFRLEVBQUU7WUFFckMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjs7Ozs7O1FBR0QsaUNBQVU7Ozs7WUFBVixVQUFXLElBQVk7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFH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