import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons'

export const icons = {
    index: (props)=> <AntDesign name="home" size={26} {...props} />,
    explore: (props) => <Feather name="compass" size={26} {...props} />,
    profile: (props) => <AntDesign name="user" size={26} {...props} />,
    transactions: (props) => <FontAwesome6 name="sack-dollar" size={26} {...props} />
}