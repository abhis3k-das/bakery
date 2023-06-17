import styles from './Blog.module.css'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import {Navigation} from "swiper"

function EachB({each , index}){
    return (
        <div
            className={styles["blog"]}
            style={{
                height: "400px",
                overflow: "hidden",
                boxSizing: "border-box",
                marginBottom: "2rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "1rem",
                }}
            >
                <p
                    style={{
                        margin: "0 1rem",
                        order: `${index % 2 === 0 ? 0 : 1}`,
                        marginRight: `${index % 2 === 0 ? "1rem" : "0"}`,
                    }}
                >
                    25th June 2023
                </p>
                <span
                    style={{
                        marginLeft: `${index % 2 === 0 ? "0" : "1rem"}`,
                        height: "100%",
                        flex: "1",
                        borderBottom: "2px dashed gray",
                        boxSizing: "border-box",
                        transform: "translateY(calc(-1rem/2))",
                    }}
                ></span>
            </div>
            <h1
                style={{
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    margin: "1rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid white",
                }}
            >
                {each.title}
            </h1>
            <div
                style={{
                    border: "2px solid white",
                    display: "flex",
                    height: "calc(100% - 1rem - 1.3rem - 2rem - 0.5rem - 1px)",
                    position: "relative",
                    boxSizing: "border-box",
                }}
            >
                <p
                    style={{
                        padding: "1rem",
                        margin: "1rem 0",
                        flexBasis: "100%",
                        overflow: "auto",
                        order: `${index % 2 === 0 ? 0 : 1}`,
                    }}
                >
                    {each.description}
                </p>
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    style={{
                        flexBasis: "100%",
                        maxWidth: "100%",
                        height: "100%",
                        position: "relative",
                    }}
                >
                    {each.images.map((img) => {
                        return (
                            <SwiperSlide >
                                <div 
                                    style={{
                                        margin: "1rem",
                                        backgroundImage: `url(${img})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        height: "calc(100% - 2rem)",
                                        boxSizing: "border-box",
                                    }}
                                ></div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}


export default EachB;