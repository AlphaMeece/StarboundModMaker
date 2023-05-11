const fs = require("fs")
const pth = require("path")
/*
let results = `
ancientpressureplate.object        D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\ancient\\ancientpressureplate\\        1/16/2022 2:16:02 PM 4 KB OBJECT File         1    
ancientswitchhidden.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\ancient\\ancientswitchhidden\\         1/16/2022 2:16:13 PM 4 KB OBJECT File         1    
apexconsole1.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\apex\\apexconsole1\\                   1/16/2022 2:16:49 PM 2 KB OBJECT File         1    
apexconsolekeyboard.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\apex\\apexconsolekeyboard\\            1/16/2022 2:12:54 PM 2 KB OBJECT File         1    
apexstatue3.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\apex\\apexstatue3\\                    1/16/2022 2:12:19 PM 2 KB OBJECT File         1    
securitycamera.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\apex\\securitycamera\\                 1/16/2022 2:16:47 PM 2 KB OBJECT File         1    
turret.object                      D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\apex\\turret\\                         1/16/2022 2:13:43 PM 3 KB OBJECT File         1    
avianpressureplate.object          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\avian\\avianpressureplate\\            1/16/2022 2:14:09 PM 3 KB OBJECT File         1    
avianswitchhidden1.object          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\avian\\avianswitchhidden\\             1/16/2022 2:12:21 PM 4 KB OBJECT File         1    
avianswitchhidden2.object          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\avian\\avianswitchhidden\\             1/16/2022 2:13:30 PM 4 KB OBJECT File         1    
consoletribal1.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\avian\\consoletribal1\\                1/16/2022 2:14:45 PM 2 KB OBJECT File         1    
consoletribal2.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\avian\\consoletribal2\\                1/16/2022 2:15:47 PM 2 KB OBJECT File         1    
consoletribal3.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\avian\\consoletribal3\\                1/16/2022 2:16:52 PM 3 KB OBJECT File         1    
consoletribal4.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\avian\\consoletribal4\\                1/16/2022 2:13:11 PM 2 KB OBJECT File         1    
foundrybutton.object               D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrybutton\\         1/16/2022 2:13:06 PM 2 KB OBJECT File         1    
foundryconsole.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundryconsole\\        1/16/2022 2:13:40 PM 2 KB OBJECT File         1    
foundryelevatorlong.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundryelevator\\       1/16/2022 2:12:27 PM 5 KB OBJECT File         1    
foundryelevatorshort.object        D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundryelevator\\       1/16/2022 2:12:46 PM 4 KB OBJECT File         1    
foundryand.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:15:18 PM 1 KB OBJECT File         1    
foundrycountdowntimer.object       D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:16:26 PM 1 KB OBJECT File         1    
foundrydelay.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:12:36 PM 1 KB OBJECT File         1    
foundrydlatch.object               D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:15:22 PM 1 KB OBJECT File         1    
foundrynot.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:16:47 PM 1 KB OBJECT File         1    
foundryor.object                   D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:14:38 PM 1 KB OBJECT File         1    
foundrytimer.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:13:28 PM 1 KB OBJECT File         1    
foundrytimer1s.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:13:22 PM 1 KB OBJECT File         1    
foundrytimer2s.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:15:42 PM 1 KB OBJECT File         1    
foundrytimer3s.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:13:01 PM 1 KB OBJECT File         1    
foundrytimer4s.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:15:22 PM 1 KB OBJECT File         1    
foundryxor.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:16:11 PM 2 KB OBJECT File         1    
foundrytimer5s.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundrylogic\\          1/16/2022 2:12:33 PM 1 KB OBJECT File         1    
foundryswitch.object               D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\foundry\\foundryswitch\\         1/16/2022 2:12:21 PM 2 KB OBJECT File         1    
lasertripwire.object               D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\scorchedcity\\lasertripwire\\    1/16/2022 2:12:19 PM 2 KB OBJECT File         1    
scorchedlandmine.object            D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\scorchedcity\\scorchedlandmine\\ 1/16/2022 2:13:22 PM 2 KB OBJECT File         1    
boilervalve.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\steamspring\\boilervalve\\       1/16/2022 2:12:20 PM 2 KB OBJECT File         1    
tarconsole.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\biome\\tar\\tarconsole\\                1/16/2022 2:16:22 PM 3 KB OBJECT File         1    
huntingpressureplate.object        D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\floran\\huntingpressureplate\\         1/16/2022 2:16:02 PM 2 KB OBJECT File         1    
plantpanel.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\floran\\plantpanel\\                   1/16/2022 2:14:30 PM 2 KB OBJECT File         1    
humangenerator.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generators\\humangenerator\\           1/16/2022 2:16:33 PM 3 KB OBJECT File         1    
darkcomputer.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\darkcomputer\\                1/16/2022 2:13:37 PM 3 KB OBJECT File         1    
durasteelelevatorlong.object       D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\durasteelelevator\\           1/16/2022 2:15:43 PM 5 KB OBJECT File         1    
durasteelelevatorshort.object      D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\durasteelelevator\\           1/16/2022 2:14:32 PM 4 KB OBJECT File         1    
ironswitch.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\ironswitch\\                  1/16/2022 2:15:12 PM 2 KB OBJECT File         1    
mechanicalelevatorlong.object      D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\mechanicalelevator\\          1/16/2022 2:15:46 PM 7 KB OBJECT File         1    
mechanicalelevatorshort.object     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\mechanicalelevator\\          1/16/2022 2:13:31 PM 5 KB OBJECT File         1    
sprinkler.object                   D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\sprinkler\\                   1/16/2022 2:13:10 PM 3 KB OBJECT File         1    
woodenelevatorlong.object          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\woodenelevator\\              1/16/2022 2:13:09 PM 5 KB OBJECT File         1    
woodenelevatorshort.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\generic\\woodenelevator\\              1/16/2022 2:13:04 PM 4 KB OBJECT File         1    
castleswitch.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\glitch\\castleswitch\\                 1/16/2022 2:13:34 PM 2 KB OBJECT File         1    
medievalarmorswitch.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\glitch\\medievalarmorswitch\\          1/16/2022 2:16:11 PM 2 KB OBJECT File         1    
medievalbookcaseswitch.object      D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\glitch\\medievalbookcaseswitch\\       1/16/2022 2:15:46 PM 2 KB OBJECT File         1    
medievalpressureplate.object       D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\glitch\\medievalpressureplate\\        1/16/2022 2:13:32 PM 2 KB OBJECT File         1    
medievalswitchhidden.object        D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\glitch\\medievalswitchhidden\\         1/16/2022 2:16:27 PM 4 KB OBJECT File         1    
medievalswitchlever.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\glitch\\medievalswitchlever\\          1/16/2022 2:16:11 PM 2 KB OBJECT File         1    
medievalswitchshackle.object       D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\glitch\\medievalswitchshackle\\        1/16/2022 2:16:27 PM 2 KB OBJECT File         1    
sewervalve.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\glitch\\sewervalve\\                   1/16/2022 2:14:20 PM 2 KB OBJECT File         1    
bunkerbigpanel.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\human\\bunkerbigpanel\\                1/16/2022 2:15:46 PM 2 KB OBJECT File         1    
bunkerconsole2.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\human\\bunkerconsole2\\                1/16/2022 2:12:47 PM 3 KB OBJECT File         1    
bunkerconsole3.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\human\\bunkerconsole3\\                1/16/2022 2:14:06 PM 3 KB OBJECT File         1    
bunkerconsole4.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\human\\bunkerconsole4\\                1/16/2022 2:15:18 PM 3 KB OBJECT File         1    
bunkereyescanner.object            D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\human\\bunkereyescanner\\              1/16/2022 2:17:00 PM 2 KB OBJECT File         1    
bunkerhandscanner.object           D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\human\\bunkerhandscanner\\             1/16/2022 2:16:31 PM 2 KB OBJECT File         1    
bunkermotiondetector.object        D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\human\\bunkermotiondetector\\          1/16/2022 2:15:33 PM 2 KB OBJECT File         1    
prisoncontrolpanel.object          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\human\\prisoncontrolpanel\\            1/16/2022 2:15:07 PM 2 KB OBJECT File         1    
hylotlbutton.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\hylotl\\hylotlbutton\\                 1/16/2022 2:16:51 PM 2 KB OBJECT File         1    
hylotlliquidsensor.object          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\hylotl\\hylotlliquidsensor\\           1/16/2022 2:16:00 PM 3 KB OBJECT File         1    
pumpsign.object                    D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\hylotl\\pumpsign\\                     1/16/2022 2:13:33 PM 2 KB OBJECT File         1    
glitchalarm.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\mission\\glitchmission\\glitchalarm\\   1/16/2022 2:16:18 PM 2 KB OBJECT File         1    
lunarbaseconsole.object            D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\mission\\lunarbaseconsole\\            1/16/2022 2:14:54 PM 3 KB OBJECT File         1    
lunarbaselaser.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\mission\\lunarbaselaser\\              1/16/2022 2:14:42 PM 3 KB OBJECT File         1    
proximitywallsensor.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\mission\\proximitywallsensor\\         1/16/2022 2:13:56 PM 2 KB OBJECT File         1    
trapchest.object                   D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\mission\\trapchest\\                   1/16/2022 2:15:35 PM 2 KB OBJECT File         1    
neonhologram.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\neon\\neonhologram\\                   1/16/2022 2:12:39 PM 3 KB OBJECT File         1    
officecomputer.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\office\\officecomputer\\               1/16/2022 2:15:27 PM 3 KB OBJECT File         1    
outpostbutton.object               D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\outpost\\outpostbutton\\               1/16/2022 2:17:07 PM 2 KB OBJECT File         1    
outpostconsole.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\outpost\\outpostconsole\\              1/16/2022 2:13:32 PM 3 KB OBJECT File         1    
outpostkeypad.object               D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\outpost\\outpostkeypad\\               1/16/2022 2:14:28 PM 2 KB OBJECT File         1    
outpostsecurityconsole.object      D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\outpost\\outpostsecurityconsole\\      1/16/2022 2:13:05 PM 3 KB OBJECT File         1    
peacekeepercomputer.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\peacekeeper\\peacekeepercomputer\\     1/16/2022 2:12:50 PM 3 KB OBJECT File         1    
astroconsole.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\space\\astroconsole\\                  1/16/2022 2:15:39 PM 3 KB OBJECT File         1    
dockingfield.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\space\\dockingfield\\                  1/16/2022 2:15:19 PM 4 KB OBJECT File         1    
dockingfieldsmall.object           D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\space\\dockingfield\\                  1/16/2022 2:15:15 PM 4 KB OBJECT File         1    
industrialcomputer.object          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\space\\industrialcomputer\\            1/16/2022 2:13:12 PM 3 KB OBJECT File         1    
industrialdisplay.object           D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\space\\industrialdisplay\\             1/16/2022 2:12:23 PM 3 KB OBJECT File         1    
solarpanel.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\space\\solarpanel\\                    1/16/2022 2:16:28 PM 2 KB OBJECT File         1    
stationconsole.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\space\\stationconsole\\                1/16/2022 2:12:33 PM 3 KB OBJECT File         1    
doomswitch.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\themed\\doom\\doomswitch\\              1/16/2022 2:15:26 PM 2 KB OBJECT File         1    
executiveswitch.object             D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\themed\\executive\\executiveswitch\\    1/16/2022 2:12:50 PM 2 KB OBJECT File         1    
geometricswitch.object             D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\themed\\geometric\\geometricswitch\\    1/16/2022 2:16:24 PM 2 KB OBJECT File         1    
opulentswitch.object               D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\themed\\opulent\\opulentswitch\\        1/16/2022 2:17:03 PM 2 KB OBJECT File         1    
sereneswitch.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\themed\\serene\\sereneswitch\\          1/16/2022 2:12:13 PM 2 KB OBJECT File         1    
waveswitch.object                  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\themed\\wave\\waveswitch\\              1/16/2022 2:13:47 PM 2 KB OBJECT File         1    
tier1switch.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\tiered\\tier1switch\\                  1/16/2022 2:12:53 PM 2 KB OBJECT File         1    
tier2switch.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\tiered\\tier2switch\\                  1/16/2022 2:14:47 PM 3 KB OBJECT File         1    
tier3switch.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\tiered\\tier3switch\\                  1/16/2022 2:16:22 PM 2 KB OBJECT File         1    
tier4switch.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\tiered\\tier4switch\\                  1/16/2022 2:13:06 PM 2 KB OBJECT File         1    
wallb.object                       D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\traps\\wallb\\                         1/16/2022 2:12:53 PM 3 KB OBJECT File         1    
bigredbutton.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\bigredbutton\\                  1/16/2022 2:16:18 PM 2 KB OBJECT File         1    
drain.object                       D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\drain\\                         1/16/2022 2:15:02 PM 2 KB OBJECT File         1    
jumppad.object                     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\forcepad\\                      1/16/2022 2:13:14 PM 2 KB OBJECT File         1    
invisiblesound.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\invisiblesound\\                1/16/2022 2:14:44 PM 1 KB OBJECT File         1    
landmine.object                    D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\landmine\\                      1/16/2022 2:15:02 PM 2 KB OBJECT File         1    
lightsensor.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\lightsensor\\                   1/16/2022 2:15:07 PM 2 KB OBJECT File         1    
liquidsensor.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\liquidsensor\\                  1/16/2022 2:15:13 PM 2 KB OBJECT File         1    
and.object                         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:16:36 PM 2 KB OBJECT File         1    
bulb.object                        D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:17:07 PM 1 KB OBJECT File         1    
countdowntimer.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:12:21 PM 2 KB OBJECT File         1    
delay.object                       D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:14:47 PM 1 KB OBJECT File         1    
dlatch.object                      D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:14:07 PM 1 KB OBJECT File         1    
invisibleand.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:16:26 PM 1 KB OBJECT File         1    
invisiblecountdowntimer.object     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:15:21 PM 1 KB OBJECT File         1    
invisibledelay.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:15:19 PM 1 KB OBJECT File         1    
invisibledlatch.object             D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:16:13 PM 1 KB OBJECT File         1    
invisiblenot.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:13:04 PM 1 KB OBJECT File         1    
invisibleor.object                 D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:13:15 PM 1 KB OBJECT File         1    
invisibletimer.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:16:08 PM 1 KB OBJECT File         1    
invisiblexor.object                D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:12:15 PM 1 KB OBJECT File         1    
not.object                         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:13:17 PM 1 KB OBJECT File         1    
or.object                          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:12:28 PM 2 KB OBJECT File         1    
timer.object                       D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:15:31 PM 1 KB OBJECT File         1    
timer1s.object                     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:13:40 PM 1 KB OBJECT File         1    
timer2s.object                     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:16:03 PM 1 KB OBJECT File         1    
timer3s.object                     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:13:17 PM 1 KB OBJECT File         1    
timer4s.object                     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:15:38 PM 1 KB OBJECT File         1    
timer5s.object                     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:12:52 PM 1 KB OBJECT File         1    
xor.object                         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\logic\\                         1/16/2022 2:12:29 PM 2 KB OBJECT File         1    
movingelevatorlong.objectdisabled  D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\movingplatform\\                1/16/2022 2:15:29 PM 8 KB OBJECTDISABLED File 1    
movingelevatorshort.objectdisabled D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\movingplatform\\                1/16/2022 2:13:08 PM 5 KB OBJECTDISABLED File 1    
invisiblepersistentswitch.object   D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\persistentswitch\\              1/16/2022 2:14:09 PM 1 KB OBJECT File         1    
persistentswitch.object            D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\persistentswitch\\              1/16/2022 2:16:01 PM 2 KB OBJECT File         1    
invisibleproximitysensor.object    D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\proximitysensor\\               1/16/2022 2:13:15 PM 1 KB OBJECT File         1    
proximitysensor.object             D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\proximitysensor\\               1/16/2022 2:12:44 PM 2 KB OBJECT File         1    
scanner.object                     D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\scanner\\                       1/16/2022 2:12:18 PM 2 KB OBJECT File         1    
shieldgenerator.object             D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\shieldgenerator\\               1/16/2022 2:15:26 PM 2 KB OBJECT File         1    
smallfloorbutton.object            D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\smallfloorbutton\\              1/16/2022 2:15:31 PM 2 KB OBJECT File         1    
smallwallbutton.object             D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\smallwallbutton\\               1/16/2022 2:15:23 PM 2 KB OBJECT File         1    
invisiblewallswitch.object         D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\smallwallswitch\\               1/16/2022 2:15:48 PM 1 KB OBJECT File         1    
smallwallswitch.object             D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\smallwallswitch\\               1/16/2022 2:12:30 PM 2 KB OBJECT File         1    
smallwallswitchlit.object          D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\smallwallswitch\\               1/16/2022 2:15:01 PM 2 KB OBJECT File         1    
standingturret.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\standingturret\\                1/16/2022 2:14:40 PM 5 KB OBJECT File         1    
tinywallbutton.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\tinywallbutton\\                1/16/2022 2:15:29 PM 2 KB OBJECT File         1    
tinywallswitch.object              D:\\Steam\\steamapps\\common\\Starbound\\_UnpackedAssets\\objects\\wired\\tinywallswitch\\                1/16/2022 2:15:36 PM 2 KB OBJECT File         1    
`

let paths = results.split("\n").map(x => {
    let s = x.split(/ +/)
    return s[1] + s[0]
}).slice(1, -1)
*/

let paths = fs.readdirSync(pth.join(__dirname, 'jsondumps'))

let keys = []

for(let p of paths) {
    let path = pth.join(__dirname, 'jsondumps', p)
    
    let res = fs.readFileSync(path, {
        encoding: 'utf8'
    })

    let arr = JSON.parse(res.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m))
    for(let obj of arr){
        if(keys.find(y => y.key == obj.key) != undefined) {
            keys.find(y => y.key == obj.key).files.push(p)
        } else {
            keys.push({
                key: obj.key,
                files: [p]
            })
        }
    }
}

//for(let key of keys) {
//    key.files = [...key.files]
//}

fs.writeFileSync("allKeys.json", JSON.stringify(keys, null, "\t"))