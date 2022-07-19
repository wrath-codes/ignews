import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SignInButton() {
    // Checa se o usuário está logado
    const isUserLoggedIn = true;

    return isUserLoggedIn ?
        (
            <button type='button' className={styles.signInButton}>
                <FaGithub color='#04d361' />
                <span>raph.dev</span>
                <FiX color='#737380' className={styles.closeIcon} />
            </button>
        ) : (

            <button type='button' className={styles.signInButton}>
                <FaGithub color='#eba417' />
                <span>Sign in with GitHub</span>
            </button>

        );
}
