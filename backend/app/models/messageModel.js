module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
        text: {
            type: DataTypes.STRING
        },
        timestamp: {
            type: DataTypes.DATE
        },
        wasRead: {
            type: DataTypes.BOOLEAN
        }
    }, { timestamps: false });

    Message.associate = function (models) {
        Message.belongsTo(models.User, {
            foreignKey: 'senderEmail',
            as: 'sender'
        });
        Message.belongsTo(models.User, {
            foreignKey: 'receiverEmail',
            as: 'receiver'
        });
    }
    return Message;
};