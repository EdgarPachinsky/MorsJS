import s3_service from '../service/aws_s3.js'

export default {

    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Promise<void>}
     */
    get:async (req,res) => {
        // get parameters from request
        let params = req.params;

        (await s3_service.get(
            `${process.env.BUCKET_NAME}`,
            `${params.year}/${params.month}/${params.day}/${params.fileName}`
        )).on('error', err => {
            return res.status(404).json({errorMessage: '404 file not found'})
        }).pipe(res)
    },
}