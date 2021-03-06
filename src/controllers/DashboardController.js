const Event = require('../models/Event')
// const User = require('../models/User')

module.exports = {
    async getEventById(req,res){
        const {event_id} = req.params

        try {
            const event = await Event.findById(event_id)
            if(event){
                return res.json(event)
            }  
        } catch (error) {
            return res.status(400).json({
                message: "Event ID does not exist!"
            })
        }
    },
    async getAllEvents(req,res){
        const { sport } = req.params
        const query = {sport} || {}
        try {
            const events = await Event.find(query)
            if(events){
                return res.json(events)
            }
        } catch (error) {
            return res.status(400).json({
                message: "We don't have any event yet"
            })
        }
    }
}