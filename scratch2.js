

function(J, D, B, I, K, L, M, F, E, A) {
	if(explainPanelBod != null) {
		explainPanelBod.cfg.setProperty("zindex", "5", false)
	}
	if(detailsPanelBod == null) {
		setDetailsOverlay()
	}
	detailsPanelBod.setBody(loadingDivRef.innerHTML);
	if(!F) {
		if(J == "station") {
			setHeaderTable(detailsPanelBod, B + " Train Railway Station");
			detailsPanelBod.cfg.setProperty("width", "700px", false);
			detailsPanelBod.cfg.setProperty("height", "475px", false);
		} else {
			if(J == "train") {
				setHeaderTable(detailsPanelBod, B + " (" + D + ")");
				detailsPanelBod.cfg.setProperty("width", "730px", false);
				detailsPanelBod.cfg.setProperty("height", "549px", false)
			} else {
				setHeaderTable(detailsPanelBod, "<center>" + B + " - " + D + "</center>");
				detailsPanelBod.cfg.setProperty("width", "680px", false);
				detailsPanelBod.cfg.setProperty("height", "592px", false)
			}
		}
	} else {
		setHeaderTable(detailsPanelBod, B);
		YAHOO.mmt.Event.abortAll.fire()
	}
	detailsPanelBod.show();
	var C, G = false;
	if(M == null) {
		if(J != "boarding") {
			trainDetailsOverlay = null;
			C = "id=" + D;
			if(I != null) {
				I = formatFormDate(setJSDate(I))
			} else {
				I = formatFormDate(setJSDate(-1))
			}
			if(J == "train") {
				if(I != null) {
					C += "&date=" + I
				}
				C += "&srcStn=" + K + "&destStn=" + L
			}
			if(historyCounter == 4) {
				historyCounter = -1;
				G = true
			}
			historyCounter++;
			historyArray[historyCounter] = C;
			if(J == "train") {
				historyArray[historyCounter] = "trains/includes/overlay_" + C;
				makeRequestSimple("trains/includes/overlay", C)
			} else {
				if(J == "station") {
					historyArray[historyCounter] = "stations/includes/detail_" + C;
					makeRequestSimple("stations/includes/detail", C)
				}
			}
			if(!G) {
				if(historyArray[historyCounter] == historyArray[historyCounter - 1]) {
					historyCounter--
				}
			} else {
				if(historyArray[historyCounter] == historyArray[4]) {
					historyCounter = 4
				}
			}
		} else {
			if(J == "boarding") {
				detailsPanelBod.cfg.setProperty("width", "680px", false);
				detailsPanelBod.cfg.setProperty("height", "493px", false);
				trainDetailsOverlay = E;
				var H = getNormalRadioByCode(D) ? "GN" : "CK";
				M = "date=" + I + "&srcStn=" + K + "&saveBooking=false&destStn=" + L + "&trainNo=" + D + "&qouta=" + H + "&journeyType=";
				if(tripType != "oneWay") {
					M += (tableNum() == 1 ? "go" : "rt");
					if((goSelected != null && returnSelected == null && tableNum() != 1) || (returnSelected != null && goSelected == null && tableNum() != 2)) {
						M += "&showRet=0"
					}
				}
				makeRequestSimple("includes/openResultPopUp", M)
			}
		}
	} else {
		detailsPanelBod.cfg.setProperty("width", "730px", false);
		detailsPanelBod.cfg.setProperty("height", "549px", false);
		makeRequestSimple(M.substring(0, M.indexOf("_")), M.substring(M.indexOf("_") + 1))
	}
	detailsPanelBod.center();
	YAHOO.widget.Overlay.windowResizeEvent.fire()
}