import styles from "@/components/widgets/styles.module.css"
import React from 'react'
import Image from "next/image";
import Vase from "@/components/assets/Rectangle 39.png"
import Chair from "@/components/assets/Rectangle 37.png"
import Kitchen from "@/components/assets/Rectangle 44.png"
import Dinning from "@/components/assets/Rectangle 45.png"
import Vases from "@/components/assets/Rectangle 36.png"
import Laptop from "@/components/assets/Rectangle 38.png"
import Bed from "@/components/assets/Rectangle 43.png"
import Frame from "@/components/assets/Rectangle 41.png"
const Pictures = () => {
  return (
   
    <div className={styles.container}>
      {/* Row 1 */}
      <div className={`${styles.box} ${styles.bookshelf}`}>
        <Image src={Vases} alt="Bookshelf" layout="fill" className={styles.image} />
      </div>
      <div className={`${styles.box} ${styles.laptop}`}>
        <Image src={Laptop} alt="Laptop on desk" layout="fill" className={styles.image} />
      </div>
      <div className={`${styles.box} ${styles.bedroom}`}>
        <Image src={Bed} alt="Bedroom" layout="fill" className={styles.image} />
      </div>

      {/* Row 2 */}
      <div className={`${styles.box} ${styles.diningRoom}`}>
        <Image src={Vase} alt="vases" layout="fill" className={styles.image} />
      </div>
      <div className={`${styles.box} ${styles.kitchen}`}>
        <Image src={Kitchen} alt="Kitchen" layout="fill" className={styles.image} />
      </div>

    
      
    </div>
  );
}


export default Pictures