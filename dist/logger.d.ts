import { RootLogger } from 'loglevel';
interface KeyValue {
    [propName: string]: any;
}
export interface ActLogger extends RootLogger {
    setPrefix(x: any): void;
    corpInfo(text: string, config?: KeyValue): void;
    logsTitle(): boolean;
}
declare function initLogger(globalLoggerName?: string): ActLogger;
export default initLogger;
