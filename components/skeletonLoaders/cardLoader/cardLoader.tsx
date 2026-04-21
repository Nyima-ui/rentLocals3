import styles from './cardLoader.module.css'

const cardLoader = () => {
  return (
    <div className={styles.cardLoader}>
       <div className={styles.box1}></div>
       <div className={styles.box2}></div>
       <div className={styles.box3}></div>
    </div>
  )
}

export default cardLoader
