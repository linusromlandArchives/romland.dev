//External Dependencies import
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';

//Local Dependencies import
import { user as userModel } from '../models';

function initializePassport() {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username: string, password: string, done: any) => {
            //Find user by email
            const user = (await userModel.findOne({
                where: {
                    username,
                },
            })) as any;
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }),
    );
    passport.serializeUser((user: any, done: any) => {
        done(null, user.userID);
    });
    passport.deserializeUser(async (id: any, done: any) => {
        const user = await userModel.findByPk(id);
        done(null, user);
    });
}

export { passport, initializePassport };
