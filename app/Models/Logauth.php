<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logauth extends Model
{
    use HasFactory;
    public function getsysteme($u_agent ){
        if (preg_match('/linux/i', $u_agent)) {
            $platform = 'linux';
        }
        elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
            $platform = 'mac';
        }
        elseif (preg_match('/windows|win32/i', $u_agent)) {
            $platform = 'windows';
        }else{
            $platform ="autre";
        }
        return $platform;
    }



    public function getagent($u_agent){
            if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent))
        {
            $ub = 'Internet Explorer';
        }
        elseif(preg_match('/Trident/i',$u_agent))
        { 
            $ub = "Internet Explorer";
        }
        elseif(preg_match('/Firefox/i',$u_agent))
        {
            $ub = "Firefox";
        }
        elseif(preg_match('/Chrome/i',$u_agent))
        {
            $ub = "Chrome";
        }
        elseif(preg_match('/Safari/i',$u_agent))
        {
            $ub = "Safari";
        }
        elseif(preg_match('/Opera/i',$u_agent))
        {
            $ub = "Opera";
        }
        elseif(preg_match('/Netscape/i',$u_agent))
        {
            $ub = "Netscape";
        }else{
            $ub ="autre";
        }
        return $ub;
    }
}
