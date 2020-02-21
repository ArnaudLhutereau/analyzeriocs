/* Links

Websites used :
- https://www.ipqualityscore.com/
- https://www.virustotal.com
- https://any.run
- https://metadefender.opswat.com
- http://metapicz.com
- https://www.verexif.com
- https://github.com

Attributs
Link : info["linkUrl"]
Image : info["srcUrl"]

*/


function onClickHandler(info, tab) {
  
  if(info.menuItemId == "Select_search_ip") {
    // Search IP
    console.log("search ip "+info["selectionText"]);
    chrome.tabs.create({url: "https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/"+info["selectionText"]});

	// ---------------------------------------------------------------------
	// Virus total

  } else if (info.menuItemId == "Select_virustotal_hash") {
    // Search Hash
    console.log("search hash "+info["selectionText"]);
    chrome.tabs.create({url: "https://www.virustotal.com/gui/file/"+info["selectionText"]+"/detection"});

  } else if (info.menuItemId == "Select_virustotal_url") {
    // Search URL
    var hash_url = sha256(info["selectionText"])
    console.log("search hash "+hash_url);
    chrome.tabs.create({url: "https://www.virustotal.com/gui/url/"+hash_url+"/detection"});

  } else if (info.menuItemId == "Select_virustotal_domain") {
    // Search domain
    console.log("search domain "+info["selectionText"]);
    chrome.tabs.create({url: "https://www.virustotal.com/gui/domain/"+info["selectionText"]+"/detection"});

  } else if (info.menuItemId == "Select_virustotal_ip") {
    // Search IP 
    console.log("search ip "+info["selectionText"]);
	chrome.tabs.create({url: "https://www.virustotal.com/gui/ip-address/"+info["selectionText"]+"/summary"});

	// ---------------------------------------------------------------------
	// Any.run

  } else if (info.menuItemId == "S_recherche_any_hash") {
	// Search IP/Domain/URL
	var hash_url = sha256(info["selectionText"]).toLowerCase();
    console.log("search hash "+hash_url);
	chrome.tabs.create({url: "https://any.run/report/"+hash_url+"/"});


	// ---------------------------------------------------------------------
	// Others

  } else if (info.menuItemId == "Select_others_meta_ip") {
	// Search IP on MetaDefender
	var hash_ip = btoa(info["selectionText"])
    console.log("search ip "+hash_ip);
	chrome.tabs.create({url: "https://metadefender.opswat.com/results#!/ip/"+hash_ip+"/overview"});

	} else if (info.menuItemId == "Select_others_meta_ip2") {
	// Search IP on AlienVault
    console.log("search ip "+info["selectionText"]);
	chrome.tabs.create({url: "https://otx.alienvault.com/indicator/ip/"+info["selectionText"]});

  } else if (info.menuItemId == "Select_autres_meta_hash") {
	// Search hash on MetaDefender
	var hash_url = info["selectionText"]
    console.log("search hash "+hash_url);
	chrome.tabs.create({url: "https://metadefender.opswat.com/results#!/file/"+hash_url+"/hash/overview"});

	} else if (info.menuItemId == "Select_autres_meta_hash2") {
	// Search hash on AlienVault
	var hash_url = info["selectionText"]
    console.log("search hash "+hash_url);
	chrome.tabs.create({url: "https://otx.alienvault.com/indicator/file/"+hash_url});



	// ---------------------------------------------------------------------
	// Link

  } else if (info.menuItemId == "Link_search_url") {
    // Search URL
    var hash_url = sha256(info["linkUrl"])
    console.log("search url "+hash_url)
    chrome.tabs.create({url: "https://www.virustotal.com/gui/url/"+hash_url+"/detection"});
	
	// ---------------------------------------------------------------------
	// Image


  } else if (info.menuItemId == "Image_search_exif1") {
    // Search EXIF
    console.log("search exif1");
    chrome.tabs.create({url: "http://metapicz.com/#landing?imgsrc="+info["srcUrl"]});

  } else if (info.menuItemId == "Image_search_exif12") {
    // Search EXIF
    console.log("search exif2");
	chrome.tabs.create({url: "https://www.verexif.com/fr/ver.php?foto_file=&foto_url="+info["srcUrl"]});
	

	
	// ---------------------------------------------------------------------
	// About

  } else if (info.menuItemId == "General_about") {
    // Search URL
    console.log("about");
    chrome.tabs.create({url: "https://github.com/ArnaudLhutereau/analyzeriocs"});


  } else {
    console.log("No action");
  }
};

// Add listiner
chrome.contextMenus.onClicked.addListener(onClickHandler);

// Add contextMenu
chrome.runtime.onInstalled.addListener(function() {

  // Add menu depending on the current context :
  // - selection : Right click during text selection
  // - link : Right click on a link
  // - image : Right click on an image
  
  // Selection
  chrome.contextMenus.create({"title": "Search IP", "contexts": ["selection"], "id": "Select_search_ip"});
  //  Subfolder Virus Total
  chrome.contextMenus.create({"title": "Virus Total", "contexts": ["selection"], "id": "Select_virustotal"});
  chrome.contextMenus.create({"title": "Search hash", "contexts": ["selection"], "parentId": "Select_virustotal", "id": "Select_virustotal_hash"});
  chrome.contextMenus.create({"title": "Search URL", "contexts": ["selection"], "parentId": "Select_virustotal", "id": "Select_virustotal_url"});
  chrome.contextMenus.create({"title": "Search domain", "contexts": ["selection"], "parentId": "Select_virustotal", "id": "Select_virustotal_domain"});
  chrome.contextMenus.create({"title": "Search IP", "contexts": ["selection"], "parentId": "Select_virustotal", "id": "Select_virustotal_ip"});

  // Subfolder Any.run
  chrome.contextMenus.create({"title": "Any.run", "contexts": ["selection"], "id": "S_parent_anyrun"});
  chrome.contextMenus.create({"title": "Search in database", "contexts": ["selection"], "parentId": "S_parent_anyrun", "id": "S_recherche_any_hash"});

  // Subfolder Others
  chrome.contextMenus.create({"title": "Others", "contexts": ["selection"], "id": "Select_others"});
  chrome.contextMenus.create({"title": "IP - MetaDefender", "contexts": ["selection"], "parentId": "Select_others", "id": "Select_others_meta_ip"});
  chrome.contextMenus.create({"title": "IP - AlienVault", "contexts": ["selection"], "parentId": "Select_others", "id": "Select_others_meta_ip2"});
  chrome.contextMenus.create({"title": "Hash - MetaDefender", "contexts": ["selection"], "parentId": "Select_others", "id": "Select_autres_meta_hash"});
  chrome.contextMenus.create({"title": "Hash - AlienVault", "contexts": ["selection"], "parentId": "Select_others", "id": "Select_autres_meta_hash2"});
  
  // Link
  chrome.contextMenus.create({"title": "Search URL", "contexts": ["link"], "id": "Link_search_url"});
  
  // Image
  chrome.contextMenus.create({"title": "Metapicz - EXIF", "contexts": ["image"], "id": "Image_search_exif1"});
  chrome.contextMenus.create({"title": "Verexif - EXIF", "contexts": ["image"], "id": "Image_search_exif12"});

  // General
  chrome.contextMenus.create({"title": "About", "contexts": ["selection", "link","image"], "id": "General_about"});

});

// Function to get SHA256
// Source : https://geraintluff .github.io/sha256/
var sha256 = function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};