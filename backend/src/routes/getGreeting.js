const GREETING = 'Deployed through GitHub — Hosthing webhook verified';

module.exports = async (req, res) => {
    res.send({
        greeting: GREETING,
    });
};
