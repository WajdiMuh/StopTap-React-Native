import { Colorshopitem } from "./Colorshopitem";
import { Colorselectorshopitem } from "./Colorselectorshopitem";
import { Coinsmultiplieritem } from "./Coinsmultiplieritem";
import { Extralifeitem } from "./Extralifeitem";
export const shopitems  = [
  <Colorshopitem bigcolor={'#ff0000'} smallcolor={'#0048ff'} title={"redandblue"} itemid={0}></Colorshopitem>,
  <Colorshopitem bigcolor={'#24ff00'} smallcolor={'#ff0073'} title={"greenandpink"} price={250} itemid={1}></Colorshopitem>,
  <Colorshopitem bigcolor={'#0400ff'} smallcolor={'#ff5100'} title={"blueandorange"} price={250} itemid={2}></Colorshopitem>,
  <Colorshopitem bigcolor={'#9500ff'} smallcolor={'#00ff15'} title={"purpleandgreen"} price={250} itemid={3}></Colorshopitem>,
  <Colorshopitem bigcolor={'#0093fc'} smallcolor={'#defc00'} title={"blueandyellow"} price={250} itemid={4}></Colorshopitem>,
  <Colorshopitem bigcolor={'#572b2b'} smallcolor={'#ffee00'} title={"brownandyellow"} price={250} itemid={5}></Colorshopitem>,
  <Colorshopitem bigcolor={'#3b3b3b'} smallcolor={'#ff0000'} title={"greyandred"} price={250} itemid={6}></Colorshopitem>,
  <Colorshopitem bigcolor={'#12bcc2'} smallcolor={'#ff00ff'} title={"lightblueandpink"} price={250} itemid={7}></Colorshopitem>,
  <Colorshopitem bigcolor={'#e6b3a3'} smallcolor={'#8cff8a'} title={"lightbrownandlightgreen"} price={250} itemid={8}></Colorshopitem>,
  <Colorshopitem bigcolor={'#17ec90'} smallcolor={'#3f13f0'} title={"lightgreenandblue"} price={250} itemid={9}></Colorshopitem>,
  <Colorshopitem bigcolor={'#3b450c'} smallcolor={'#d7612b'} title={"oliveandorange"} price={250} itemid={10}></Colorshopitem>,
  <Colorshopitem bigcolor={'#ff8aff'} smallcolor={'#ff0062'} title={"lightpinkandfuschia"} price={250} itemid={11}></Colorshopitem>,
  <Colorselectorshopitem price={1000} itemid={"colorselector"}></Colorselectorshopitem>,
  <Coinsmultiplieritem price={[500,1000]} itemid={"coinsmultiplier"}></Coinsmultiplieritem>,
  <Extralifeitem price={1000} itemid={"extralife"}></Extralifeitem>
]
  
export default {
  shopitems,
}