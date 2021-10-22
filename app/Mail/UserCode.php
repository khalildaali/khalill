<?php

namespace App\Mail;
use App\Models\Code;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserCode extends Mailable
{
  public $code; 
  public $user; 
  public $url;
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Code $code,User $user,$url )
    {
        $this->code = $code;
        $this->user = $user;
        $this->url = $url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('shyrineprod9@gmail.com')->subject('Code de vérification du device')->view('name');
    }
}
