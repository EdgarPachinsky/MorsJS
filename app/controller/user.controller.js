import userRepository from "../../db/repository/user.repository.js"
import formidable from "formidable"
import s3_service from '../service/aws_s3.js'

export default {

    save: async (req, res) => {

        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {

            if(err)
                return res.send({status:"error",message:err});

            if(files.file) {
                const uploadToS3 = await s3_service.upload(
                    process.env.BUCKET_NAME,
                    files.file,
                    null,
                );

                fields.avatar = uploadToS3.getLink
            }

            const result = await userRepository.save(fields);
            res.send(result);
        });


        // const result = await userRepository.save(req.body);
        // res.send("result");
    },

    delete: async (req, res) => {
        const result = await userRepository.delete(req.body);
        res.send(result);
    },

    list: async (req, res) => {
        const result = await userRepository.list();
        res.send(result);
    },
    changePassword: async (req, res) => {
        const result = await userRepository.changePassword(req.body);
        res.send(result);
    },
    changePasswordLinkCheck: async (req, res) => {
        const result = await userRepository.changePasswordLinkCheck(req.body);
        res.send(result);
    },
    changePasswordMain: async (req, res) => {
        const result = await userRepository.changePasswordMain(req.body);
        res.send(result);
    },
    checkToken: async (req, res) => {
        let user  = req.user
        res.json
        (user);
    },
};
