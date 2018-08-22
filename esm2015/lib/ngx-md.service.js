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
export class NgxMdService {
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
/** @nocollapse */ NgxMdService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(i0.inject(i1.HttpClient)); }, token: NgxMdService, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgxMdService.prototype._renderer;
    /** @type {?} */
    NgxMdService.prototype._http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWQvIiwic291cmNlcyI6WyJsaWIvbmd4LW1kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxNQUFNLENBQUE7QUFDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7OztBQUtyRCxNQUFNOzs7O0lBRUosWUFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTt5QkFEWixJQUFJLFFBQVEsRUFBRTtRQUVyQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUdELFVBQVUsQ0FBQyxJQUFZO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0tBQzFHOzs7O1FBRVcsUUFBUTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O0lBSWpCLFdBQVcsQ0FBQyxHQUFRO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDOzs7Ozs7SUFHbkIsZ0JBQWdCLENBQUMsT0FBWTtRQUNsQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUN0QixHQUFHLEVBQUUsSUFBSTtZQUNULE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLEtBQUs7WUFDYixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsVUFBVSxFQUFFLElBQUk7WUFDaEIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNaLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztJQUlmLE9BQU8sQ0FBQyxJQUFZO1FBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OztJQUlkLFdBQVcsQ0FBQyxLQUFVOztRQUM1QixJQUFJLE1BQU0sQ0FBUztRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzs7WUFDM0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzs7WUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLE1BQU0sS0FBSyxDQUFDLFVBQVUsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7U0FDL0Q7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0Q7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OztJQUlwQixjQUFjO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBWTtZQUM5QyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLEdBQUcsSUFBSTtxQkFDUixPQUFPLENBQUMsY0FBYyxFQUFFLHFIQUFxSCxDQUFDO3FCQUM5SSxPQUFPLENBQUMsY0FBYyxFQUFFLDZIQUE2SCxDQUFDLENBQUM7Z0JBQ3RKLE1BQU0sQ0FBQywrQkFBK0IsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ3pEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ2hDO1NBQ0YsQ0FBQzs7OztZQW5FUCxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFQUSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFJlbmRlcmVyLCBzZXRPcHRpb25zLCBwYXJzZSB9IGZyb20gJ21hcmtlZCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNZFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX3JlbmRlcmVyOiBhbnkgPSBuZXcgUmVuZGVyZXIoKTtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICB0aGlzLmV4dGVuZFJlbmRlcmVyKCk7XHJcbiAgICB0aGlzLnNldE1hcmtlZE9wdGlvbnMoe30pO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0IHRoZSBjb250ZW50IGZyb20gcmVtb3RlIHJlc291cmNlXHJcbiAgZ2V0Q29udGVudChwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQocGF0aCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSkucGlwZShtYXAocmVzID0+IHJlcyksIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcikpXHJcbiAgfVxyXG5cclxuICAgcHVibGljIGdldCByZW5kZXJlcigpIHtcclxuICAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XHJcbiAgIH1cclxuXHJcbiAgIC8vIGhhbmRsZSBkYXRhXHJcbiAgIHB1YmxpYyBleHRyYWN0RGF0YShyZXM6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgcmV0dXJuIHJlcy50ZXh0KCkgfHwgJyc7XHJcbiAgIH1cclxuXHJcbiAgIHB1YmxpYyBzZXRNYXJrZWRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcclxuICAgICAgIGdmbTogdHJ1ZSxcclxuICAgICAgIHRhYmxlczogdHJ1ZSxcclxuICAgICAgIGJyZWFrczogZmFsc2UsXHJcbiAgICAgICBwZWRhbnRpYzogZmFsc2UsXHJcbiAgICAgICBzYW5pdGl6ZTogZmFsc2UsXHJcbiAgICAgICBzbWFydExpc3RzOiB0cnVlLFxyXG4gICAgICAgc21hcnR5cGFudHM6IGZhbHNlXHJcbiAgICAgfSwgb3B0aW9ucyk7XHJcbiAgICAgb3B0aW9ucy5yZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xyXG4gICAgIHNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgIH1cclxuXHJcbiAgIC8vIGNvbXBsZSBtYXJrZG93biB0byBodG1sXHJcbiAgIHB1YmxpYyBjb21waWxlKGRhdGE6IHN0cmluZykge1xyXG4gICAgICByZXR1cm4gcGFyc2UoZGF0YSk7XHJcbiAgIH1cclxuXHJcbiAgIC8vIGhhbmRsZSBlcnJvclxyXG4gICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBhbnkge1xyXG4gICAgIGxldCBlcnJNc2c6IHN0cmluZztcclxuICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBmZXRjaCkge1xyXG4gICAgICAgY29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCAnJztcclxuICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XHJcbiAgICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICBlcnJNc2cgPSBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLnRvU3RyaW5nKCk7XHJcbiAgICAgfVxyXG4gICAgIHJldHVybiB0aHJvd0Vycm9yKGVyck1zZyk7XHJcbiAgIH1cclxuXHJcbiAgIC8vIGV4dGVuZCBtYXJrZWQgcmVuZGVyIHRvIHN1cHBvcnQgdG9kbyBjaGVja2JveFxyXG4gICBwcml2YXRlIGV4dGVuZFJlbmRlcmVyKCkge1xyXG4gICAgIHRoaXMuX3JlbmRlcmVyLmxpc3RpdGVtID0gZnVuY3Rpb24odGV4dDogc3RyaW5nKSB7XHJcbiAgICAgIGlmICgvXlxccypcXFtbeCBdXFxdXFxzKi8udGVzdCh0ZXh0KSkge1xyXG4gICAgICB0ZXh0ID0gdGV4dFxyXG4gICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcWyBcXF1cXHMqLywgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBzdHlsZT1cIiB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTsgZm9udC1zaXplOiAxNnB4OyBcIiBkaXNhYmxlZD4gJylcclxuICAgICAgICAucmVwbGFjZSgvXlxccypcXFt4XFxdXFxzKi8sICc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgc3R5bGU9XCIgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgbWFyZ2luOiAwIDAuMmVtIDAuMjVlbSAtMS42ZW07IGZvbnQtc2l6ZTogMTZweDsgXCIgY2hlY2tlZCBkaXNhYmxlZD4gJyk7XHJcbiAgICAgICAgICByZXR1cm4gJzxsaSBzdHlsZT1cImxpc3Qtc3R5bGU6IG5vbmVcIj4nICsgdGV4dCArICc8L2xpPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAnPGxpPicgKyB0ZXh0ICsgJzwvbGk+JztcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgIH1cclxufVxyXG4iXX0=