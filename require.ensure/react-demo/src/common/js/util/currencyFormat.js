export const moneyFormat = (money) => {
    money = money + "";
    if (money.length > 2) {
        return money.substring(0, money.length - 2) + "." + money.substring(money.length - 2, money.length);
    } else if (money.length === 1) {
        return "0.0" + money;
    } else {
        return "0." + money
    }
};
