<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
body {
    margin: 0 auto !important;
    padding: 0 !important;
    height: 100% !important;
    width: 100% !important;
    background: #83c5be;
}



    </style>


</head>

<body width="100%" >

    <div>
    	<!-- BEGIN BODY -->
      <table  role="presentation"  width="100%" >
      	<tr>
          <td valign="top" width="100%" style="padding-top: 20px;">
          	<table >
          		<tr>
          			<td  >
			            <h1><a href="#">Verification</a></h1>
			          </td>
          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
				<tr>
                <td valign="top" width="100%" style="padding-top: 20px;">
            <table>
            	<tr>
            		<td>
            			<div >
            				<h1>Verification de Device</h1>
            				<h3>Bonjour M/MR {{ $user->name }} </h3>
            				<h2>Code de verification est : {{ $code->code }}</h2>
            			</div>
            		</td>
            	</tr>
            </table>
          </td>
	      </tr><!-- end tr -->
      <!-- 1 Column Text + Button : END -->
      </table>
      <table   >
      	<tr>
                <td valign="top" width="100%" style="padding-top: 20px;">
                  <table >
                    <tr>
                      <td >
                      	<h1 >Contact Info</h1>
					                <h2>Adresse : Résidence Cité jardin 1, Appart B 1-6 67, Rue Alain Savary 1002 Tunis, Tunisie.</h2>
					                <h2>Num Télé : 216 71 84 17 03</h2>
                      </td>
                    </tr>
                  </table>
                </td>
              
              </tr>
            </table>
          </td>
        </tr><!-- end: tr -->
        <tr>
          <td class="bg_light">
          	<h2>Site Web : <a href="https://www.digital-communication.tn/" style="color: bleu;">click ici</a></h2>
          </td>
        </tr>
      </table>

    </div>
</body>
</html>