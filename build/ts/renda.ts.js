/*
*   RendaJS v1.0.0
*   Author: Zino Adidi
*   Contributors:
*
*
*/
//Import all neccessary libraries and scripts
import * as $ from 'jquery';
// renda Class
class Renda {
    constructor() {
        // APP Settings
        this.Config = {
            appTitle: "",
            displayContainer: "",
            defaultPage: "",
            viewPath: "",
            serverUrl: "",
            internalUrl: "",
            errorPage: "",
            currentPage: "",
            currentComponent: "",
            appMode: "",
            httpReqHeaders: "",
            httpRequestAuth: "",
            loader: {
                imgUrl: "",
                text: "",
                showImg: false,
                showTxt: false,
                outterCss: "",
                innerCss: ""
            },
            errorMsg: {
                pageLoad: ":{ Error while loading page...",
                componentLoad: ":{ Error while loading component...",
                appLoad: "App Start Failed"
            }
        };
        // begin configuration for renda
        this.config = function (...obj) {
            // Allocate user settings to  app settings
            this.Config.appTitle = obj == null ? 'Renda | Start Page' : obj[0]['appTitle'];
            this.Config.displayContainer = obj == null ? 'display' : obj[0]['displayContainer'];
            this.Config.viewPath = obj == null ? 'app/view/' : obj[0]['viewPath'];
            this.Config.serverUrl = obj == null ? '' : obj[0]['serverUrl'];
            this.Config.internalUrl = obj == null ? '' : obj[0]['internalUrl'];
            this.Config.errorPage = obj == null ? '404' : obj[0]['errorPage'];
            this.Config.appMode = obj == null ? 'debug' : obj[0]['appMode'];
            this.Config.defaultPage = obj == null ? 'home' : obj[0]['defaultPage'];
            this.Config.loader = obj == null ? {
                imgUrl: "",
                text: "Loading...",
                showImg: false,
                showTxt: true,
                outterCss: "",
                innerCss: ""
            } : obj['loader'];
            // Check for basic requirement and run startup process.
            if (this.Config.appTitle != '' && this.Config.displayContainer != '' &&
                this.Config.viewPath != '' && this.Config.errorPage != '') {
                this.start();
            }
            else {
                this.log(this.Config.error.appLoad + ': error with config data');
            }
        };
        //Begin Page function for loading view
        this.page = function (...obj) {
            // peace keeping
            this.loader('start');
            let url = this.config.viewPath;
            let page = obj[0][0];
            let path = url + page + '.html';
            let displayElem = this.Config.displayContainer;
            //check if display element is specified
            if (obj[0][1])
                displayElem = obj[0][1];
            else
                //Send ajax request for page
                $.get(url + page, {}, function (data, status) {
                    if (data) {
                        $('#' + displayElem).html(data);
                        this.updateUrl(page, null);
                        this.loader('stop');
                        return 0;
                    }
                    else {
                        this.page(this.Config.errorPage);
                        this.log(this.Config.error.pageLoad + ': page not found');
                        return 1;
                    }
                }).fail(function () {
                    $('#' + displayElem).html(this.Config.error.pageLoad);
                    this.log(this.Config.error.pageLoad);
                    return 1;
                });
        };
    }
}
export default 'Renda';
var renda = new Renda();
//# sourceMappingURL=renda.js.map