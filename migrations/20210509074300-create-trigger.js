'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
    CREATE TRIGGER update_amount BEFORE INSERT ON transactions
    FOR EACH ROW IF NEW.type = "debet" THEN
        UPDATE accounts 
        SET balance = balance + NEW.amount
        WHERE id = NEW.AccountId;
    ELSEIF NEW.type = "credit" THEN 
      set @balance = (select balance from accounts where id = NEW.AccountId);
      IF @balance >= NEW.amount THEN
        UPDATE accounts 
        SET balance = balance - NEW.amount
      WHERE id = NEW.AccountId;
        ELSE
      signal sqlstate '45000' set message_text = 'My Error Message';
        END IF;
    END IF`
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
