import moment from "moment";

export const timestamp = () =>
  window.performance &&
  window.performance.now &&
  window.performance.timing &&
  window.performance.timing.navigationStart
    ? window.performance.now() + window.performance.timing.navigationStart
    : Date.now();

export class TimeUtil {
  public static parse(date: string): moment.Moment {
    return moment(date);
  }
  public static now(): moment.Moment {
    return moment();
  }
  public static formattedOnlineTime(
    dateNew: moment.Moment,
    dateOld: moment.Moment
  ): string {
    const seconds = dateNew.diff(dateOld, "seconds");
    if (seconds < 5) {
      return "online";
    }
    if (seconds < 60) {
      const rounded = Math.round(seconds / 5) * 5;
      return `${rounded}s`;
    }
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.round(minutes / 60);
    if (hours < 24) {
      return `${hours}h`;
    }
    const days = Math.round(hours / 24);
    if (days == 1) {
      return `1 day`;
    }
    if (days <= 7) {
      return `${days} days`;
    }
    return ">7 days";
  }
}
