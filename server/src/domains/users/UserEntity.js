export default class User {
    constructor(id, userId, password, username, email, role, cash, createdAt, modifiedAt) {
        this.id = id;
        this.userId = userId;
        this.password = password;
        this.username = username;
        this.email = email;
        this.role = role;
        this.cash = cash;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    decreaseCash(amount) {
        if (amount <= 0) {
            throw new Error('Invalid amount');
        }

        if (amount > this.cash) {
            throw new Error('Insufficient funds');
        }

        this.cash -= amount;
    }

    increaseCash(amount) {
        if (amount <= 0) {
          throw new Error('Invalid amount');
        }
    
        this.cash += amount;
    }
}