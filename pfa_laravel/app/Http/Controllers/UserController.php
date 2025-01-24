<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTExceptions;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
class UserController extends Controller
{
    
    public function register(Request $request)
    {
        $user = User::where('email',$request['email'])->first();
        if($user)
        {
            $response['status'] = 0;
            $response['message'] = 'Email Already Exists';
            $response['code'] = 409;
            return response()->json(['message'=>"Email Already Exists","statusCode"=>409]);
        }
        else
        {
            /*if ($request->hasFile('image_CIN')) {
                $imagePath = $request->file('image_CIN')->store('public'); // You can change 'public/images' to your desired storage path
                $image = basename($imagePath);
                $imageUrl = Storage::url($imagePath);
            }*/
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'tel' => 'required|string|regex:/\+216[0-9]{8}$/',
                'ville' => 'required|string',
                'CIN' => 'required|string|regex:/^[0-9]{8}$/',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
            ]);
        $userData=User::create([
            'name' => $request->input('name'),
            'tel' => $request->input('tel'),
            'ville' => $request->input('ville'),
            'CIN' => $request->input('CIN'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
      

        //$userData = User::create($request->except('pasword_confirmation'));
        return response()->json(['message'=>"User Added", 'userData'=>$userData,"statusCode"=>200]);
        
    }}

    public function login(Request $request)
{
    try {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $credentials['email'])->first();

        if (!$user ) {
            return response()->json([
                'status' => 0,
                'data' => null,
                'message' => 'Email or password incorrect',
                'code' => 401
            ], 401);
        }
        $token = JWTAuth::claims([
            'user_id' => $user->id,
            'email' => $request->email,
            'name' =>  $user->name,
            'admin' => $user->admin,
        ])->fromUser($user);
        return response()->json([
            'status' => 1,
            'data' => $token,
            'message' => 'Login successfully',
            'code' => 200
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 0,
            'data' => null,
            'message' => 'An error occurred',
            'code' => 500
        ], 500);
    }
}

    public function getUser($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }
    public function getUsers()
    {
        return response()->json(User::all(),200);
    }
    public function updatePass(Request $request, $id){
        $user = User::find($id);
        if (is_null($user)) {
            return response()->json(['message' => 'Produit introuvable'], 404);
        }
        $request->validate([
            'current_password' => 'required|string', // Validation for the current password field
            'new_password' => 'required|string', 
        ]);
        if (!Hash::check($request->input('current_password'), $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }
        $user->password = bcrypt($request->input('new_password'));
        $user->save();
        return response($user, 200);

    }
    public function updateUser(Request $request, $id){
        $user = User::find($id);
        if (is_null($user)) {
            return response()->json(['message' => 'user introuvable'], 404);
        }
    
        // Validate the request data
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
            'tel' => 'required|string',
            'ville' => 'required|string',
            'CIN' => 'required|numeric',
        ]);
    
        // Check if the provided current password matches the user's actual password
       
    
        // Update the user's details and password
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->tel = $request->input('tel');
        $user->ville = $request->input('ville');
        $user->CIN = $request->input('CIN');
        if ($request->filled('image_CIN')){
            $imagePath = $request->input('image_CIN');
            $image = basename($imagePath);
            $imageUrl = Storage::url($imagePath);
            $user->image_CIN = $imageUrl;}
            else{
            $user->image_CIN = $user->image_CIN;
            }
     
    
        $user->save();
    
        return response($user, 200);
    }
    public function deleteUser(Request $request, $id){                  
        $user = User::find($id);                                         
        if(is_null($user)){                                                 
            return response()->json(['message' => 'User introuvable'],404); 
        }                                                                      
        $user->delete();                                                    
        return response(null,204);                                             
        } 
   /*public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Failed Email or Password not matches!!'], 401);
        }

        return $this->respondWithToken($token);
    }
     /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    
    /*protected function respondWithToken($token)
    {
        $user = auth()->user();
        return response()->json([
            'email' => $user->email,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
    public function getInfoFromToken(Request $request)
{
    $token = $request->input(respondWithToken($token));

    $decodedToken = JWTAuth::decode($token);

    $email = $decodedToken['email'];

    return response()->json(['email' => $email]);
}*/
    
           
}
