//External Dependencies import
import { Strategy } from 'passport-local';
import passport from 'passport';

//Local Dependencies import
import { user as userModel } from '../models';

function initializePassport() {
    passport.use(
        new Strategy(async (username: string, password: string, done: any) => {
            //Find user by username
            const user = (await userModel.findOne({
                where: {
                    username,
                },
            })) as any;

            //If user not found, return done with false
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            //If user found, compare password
            const isValid = await user.validatePassword(password);

            //If password is not valid, return done with false
            if (!isValid) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            //If password is valid, return done with user
            return done(null, user);
        }),
    );

    //Serialize user
    passport.serializeUser((user: any, done: any) => {
        done(null, user.userID);
    });

    //Deserialize user
    passport.deserializeUser(async (id: any, done: any) => {
        const user = await userModel.findByPk(id);
        done(null, user);
    });
}

export { passport, initializePassport };
