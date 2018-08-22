/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Renderer, setOptions, parse } from 'marked';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var NgxMdService = /** @class */ (function () {
    function NgxMdService(_http) {
        this._http = _http;
        this._renderer = new Renderer();
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
        return this._http.get(path, { responseType: 'text' }).pipe(map(function (res) { return res; }), catchError(this.handleError));
    };
    Object.defineProperty(NgxMdService.prototype, "renderer", {
        get: /**
         * @return {?}
         */
        function () {
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
        setOptions(options);
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
        return parse(data);
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
        return throwError(errMsg);
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgxMdService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ NgxMdService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(i0.inject(i1.HttpClient)); }, token: NgxMdService, providedIn: "root" });
    return NgxMdService;
}());
export { NgxMdService };
if (false) {
    /** @type {?} */
    NgxMdService.prototype._renderer;
    /** @type {?} */
    NgxMdService.prototype._http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWQvIiwic291cmNlcyI6WyJsaWIvbmd4LW1kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxNQUFNLENBQUE7QUFDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7SUFPbkQsc0JBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7eUJBRFosSUFBSSxRQUFRLEVBQUU7UUFFckMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMzQjtJQUVELHVDQUF1Qzs7Ozs7SUFDdkMsaUNBQVU7Ozs7SUFBVixVQUFXLElBQVk7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0tBQzFHOzBCQUVXLGtDQUFROzs7OztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7Ozs7O0lBSWpCLGtDQUFXOzs7O2NBQUMsR0FBUTtRQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Ozs7O0lBR25CLHVDQUFnQjs7OztjQUFDLE9BQVk7UUFDbEMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdEIsR0FBRyxFQUFFLElBQUk7WUFDVCxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDWixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7SUFJZiw4QkFBTzs7OztjQUFDLElBQVk7UUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0lBSWQsa0NBQVc7Ozs7Y0FBQyxLQUFVOztRQUM1QixJQUFJLE1BQU0sQ0FBUztRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzs7WUFDM0IsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzs7WUFDaEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sR0FBTSxLQUFLLENBQUMsTUFBTSxZQUFNLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxVQUFJLEdBQUssQ0FBQztTQUMvRDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMzRDtRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7O0lBSXBCLHFDQUFjOzs7O1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBWTtZQUM5QyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLEdBQUcsSUFBSTtxQkFDUixPQUFPLENBQUMsY0FBYyxFQUFFLHFIQUFxSCxDQUFDO3FCQUM5SSxPQUFPLENBQUMsY0FBYyxFQUFFLDZIQUE2SCxDQUFDLENBQUM7Z0JBQ3RKLE1BQU0sQ0FBQywrQkFBK0IsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ3pEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ2hDO1NBQ0YsQ0FBQzs7O2dCQW5FUCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVBRLFVBQVU7Ozt1QkFEbkI7O1NBU2EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyB0aHJvd0Vycm9yLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcydcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBSZW5kZXJlciwgc2V0T3B0aW9ucywgcGFyc2UgfSBmcm9tICdtYXJrZWQnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9yZW5kZXJlcjogYW55ID0gbmV3IFJlbmRlcmVyKCk7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgdGhpcy5leHRlbmRSZW5kZXJlcigpO1xyXG4gICAgdGhpcy5zZXRNYXJrZWRPcHRpb25zKHt9KTtcclxuICB9XHJcblxyXG4gIC8vIGdldCB0aGUgY29udGVudCBmcm9tIHJlbW90ZSByZXNvdXJjZVxyXG4gIGdldENvbnRlbnQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHBhdGgsIHtyZXNwb25zZVR5cGU6ICd0ZXh0J30pLnBpcGUobWFwKHJlcyA9PiByZXMpLCBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKVxyXG4gIH1cclxuXHJcbiAgIHB1YmxpYyBnZXQgcmVuZGVyZXIoKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyO1xyXG4gICB9XHJcblxyXG4gICAvLyBoYW5kbGUgZGF0YVxyXG4gICBwdWJsaWMgZXh0cmFjdERhdGEocmVzOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgIHJldHVybiByZXMudGV4dCgpIHx8ICcnO1xyXG4gICB9XHJcblxyXG4gICBwdWJsaWMgc2V0TWFya2VkT3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICBnZm06IHRydWUsXHJcbiAgICAgICB0YWJsZXM6IHRydWUsXHJcbiAgICAgICBicmVha3M6IGZhbHNlLFxyXG4gICAgICAgcGVkYW50aWM6IGZhbHNlLFxyXG4gICAgICAgc2FuaXRpemU6IGZhbHNlLFxyXG4gICAgICAgc21hcnRMaXN0czogdHJ1ZSxcclxuICAgICAgIHNtYXJ0eXBhbnRzOiBmYWxzZVxyXG4gICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgIG9wdGlvbnMucmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcclxuICAgICBzZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICB9XHJcblxyXG4gICAvLyBjb21wbGUgbWFya2Rvd24gdG8gaHRtbFxyXG4gICBwdWJsaWMgY29tcGlsZShkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlKGRhdGEpO1xyXG4gICB9XHJcblxyXG4gICAvLyBoYW5kbGUgZXJyb3JcclxuICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogYW55IHtcclxuICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XHJcbiAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgZmV0Y2gpIHtcclxuICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XHJcbiAgICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgZXJyTXNnID0gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCAnJ30gJHtlcnJ9YDtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xyXG4gICAgIH1cclxuICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJNc2cpO1xyXG4gICB9XHJcblxyXG4gICAvLyBleHRlbmQgbWFya2VkIHJlbmRlciB0byBzdXBwb3J0IHRvZG8gY2hlY2tib3hcclxuICAgcHJpdmF0ZSBleHRlbmRSZW5kZXJlcigpIHtcclxuICAgICB0aGlzLl9yZW5kZXJlci5saXN0aXRlbSA9IGZ1bmN0aW9uKHRleHQ6IHN0cmluZykge1xyXG4gICAgICBpZiAoL15cXHMqXFxbW3ggXVxcXVxccyovLnRlc3QodGV4dCkpIHtcclxuICAgICAgdGV4dCA9IHRleHRcclxuICAgICAgICAucmVwbGFjZSgvXlxccypcXFsgXFxdXFxzKi8sICc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgc3R5bGU9XCIgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgbWFyZ2luOiAwIDAuMmVtIDAuMjVlbSAtMS42ZW07IGZvbnQtc2l6ZTogMTZweDsgXCIgZGlzYWJsZWQ+ICcpXHJcbiAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbeFxcXVxccyovLCAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHN0eWxlPVwiIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtOyBmb250LXNpemU6IDE2cHg7IFwiIGNoZWNrZWQgZGlzYWJsZWQ+ICcpO1xyXG4gICAgICAgICAgcmV0dXJuICc8bGkgc3R5bGU9XCJsaXN0LXN0eWxlOiBub25lXCI+JyArIHRleHQgKyAnPC9saT4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gJzxsaT4nICsgdGV4dCArICc8L2xpPic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICB9XHJcbn1cclxuIl19