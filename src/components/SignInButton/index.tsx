import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

import { signIn, useSession, signOut }  from 'next-auth/react';

export function SignInButton() {
    // checa se o usuário está logado
    const { data: session } = useSession()

    console.log(session)

    return session ?
        (
            <button type='button' className={styles.signInButton}>
                <FaGithub color='#04d361' />
                {session.user.name}
                <FiX color='#737380' className={styles.closeIcon}
                    onClick={() => signOut()}
                />
            </button>
        ) : (

            <button type='button' className={styles.signInButton}
                onClick={() => signIn('github')}
            >
                <FaGithub color='#eba417' />
                <span>Sign in with GitHub</span>
            </button>

        );
}
