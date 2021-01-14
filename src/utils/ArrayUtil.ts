export default class ArrayUtil {
  public static copyList = function<E>(list: E[]): E[] {
    const newList = new Array<E>();
    list.forEach((e) => newList.push(e));
    return newList;
  };
}
