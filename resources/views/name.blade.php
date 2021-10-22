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
    margin: 25% auto !important;
    padding: 25% !important;
    height: 100% !important;
    width: 100% !important;
    background-color: #4ecdc4;
}



    </style>


</head>

<body width="100%" style='margin-left: 3%;'>

<div class="container">
  <div class="row justify-content-md-center">
  <div class="col col-lg-2">
    <img src="https://bboard.b-forbiz.com/assets/images/cliqeoAdmin.png" >
    </div>
    <div class="col-md-auto">
    	<!-- BEGIN BODY -->
      <table  role="presentation"  width="100%" >
      	<tr>
          <td valign="top" width="100%" style="padding-top: 20px;">
          	<table >
          		<tr>
          			<td  >
			            <h1><a href="#" style="color:#F6C44B">Vérification du device :</a></h1>
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
            				<h3 style="color:#0f0f0f">Bonjour M/MR {{ $user->name }} ,</h3>
            				<h2 style="color:#F6C44B">Votre code de vérification est : {{ $code->code }}</h2>
                    <h2 style="color:#F6C44B">Votre url de vérification est : {{ $url }}</h2>
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
                      	<h1 style="color:#0f0f0f">Contact Info :</h1>
					                <h2 style="color:#0f0f0f">Adresse : Résidence Cité jardin 1, Appart B 1-6 67, Rue Alain Savary 1002 Tunis, Tunisie.</h2>
					                <h2 style="color:#0f0f0f">Num Télé : 216 71 84 17 03</h2>
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
          	<h2 style="color:#0f0f0f">Site Web : <a href="https://bboard.b-forbiz.com/login" style="color:#F6C44B">click ici</a></h2>
          </td>
        </tr>
      </table>
      </div>
    </div>
    </div>
</body>
</html>