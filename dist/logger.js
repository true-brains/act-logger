import loglevel from 'loglevel';
import format from 'date-fns/format';
import styler from 'log-with-style';
const log = loglevel;
var Colors;
(function (Colors) {
    Colors["TRACE"] = "TRACE";
    Colors["DEBUG"] = "DEBUG";
    Colors["INFO"] = "INFO";
    Colors["WARN"] = "WARN";
    Colors["ERROR"] = "ERROR";
    Colors["HELPER"] = "HELPER";
})(Colors || (Colors = {}));
const colors = {
    TRACE: (text) => `[c="color: magenta"]${text}[c]`,
    DEBUG: (text) => `[c="color: cyan"]${text}[c]`,
    INFO: (text) => `[c="color: blue"]${text}[c]`,
    WARN: (text) => `[c="color: yellow"]${text}[c]`,
    ERROR: (text) => `[c="color: red"]${text}[c]`,
    HELPER: (text) => `[c="color: grey"]${text}[c]`
};
const originalFactory = loglevel.methodFactory;
function initLogger(globalLoggerName = 'global') {
    let isPrefixed = true;
    /**
     * Allows to disable/enable message prefix ([timestamp], etc)
     */
    log.setPrefix = function (x) {
        isPrefixed = Boolean(x);
    };
    log.methodFactory = function customFactory(methodName, logLevel, loggerName) {
        const rawMethod = originalFactory(methodName, logLevel, loggerName);
        const colorName = methodName.toUpperCase();
        const colorize = colors[colorName] || colors.INFO;
        return function (...msg) {
            const time = colors.HELPER(format(new Date(), 'HH:mm:ss:SSS'));
            const name = colors.HELPER(loggerName || globalLoggerName);
            const prefix = isPrefixed
                ? `[${time}] ${colorize(methodName)} (${name}): `
                : '';
            const nativeLog = console.log;
            /**
             * Styler will try to log message themself, so we temporarily disable logging,
             * to prevent this.
             */
            console.log = (...args) => args;
            const messages = msg.length > 1 ? [prefix, ...msg] : [prefix + `${msg}`];
            const result = styler(...messages);
            console.log = nativeLog;
            return rawMethod(...result);
        };
    };
    log.setLevel(log.getLevel());
    log.corpInfo = function (text, config = {}) {
        const { fontSize = '14px', padding = '20px' } = config;
        log.setPrefix(false);
        log.info(`[c="color: white; font-weight: bold; font-size: ${fontSize}; ` +
            'background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 33%, rgba(0,212,255,1) 99%); ' +
            `padding: ${padding};"]${text}[c]`);
        log.setPrefix(true);
    };
    log.logsTitle = function () {
        log.corpInfo('ACT Commodities / frontend logs:');
        return true;
    };
    return log;
}
export default initLogger;
//# sourceMappingURL=logger.js.map