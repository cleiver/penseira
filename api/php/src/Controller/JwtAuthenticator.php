<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class JwtAuthenticator extends AbstractGuardAuthenticator
{
  /**
   * @var UserRepository
   */
  private $userRepository;

  public function __construct(UserRepository $userRepository)
  {
    $this->userRepository = $userRepository;
  }

  public function start(Request $request, ?AuthenticationException $authException = null)
  {
    # code...
  }

  public function supports(Request $request): bool
  {
    return '/login' !== $request->getPathInfo();
  }

  public function getCredentials(Request $request): ?object
  {
    $token = str_replace('Bearer ', '', $request->headers->get('Authorization'));

    try {
      return JWT::decode($token, '63b588cc6559c406f8a30ae836f271ea', ['HS256']);
    } catch (\Exception $e) {
      return $e;
    }
  }

  public function getUser($credentials, UserProviderInterface $userProvider): ?UserInterface
  {
    if (!is_object($credentials) || !property_exists($credentials, 'email')) {
      return null;
    }

    return $this->userRepository->findOneBy(['email' => $credentials->email]);
  }

  public function checkCredentials($credentials, UserInterface $user): bool
  {
    return is_object($credentials) && property_exists($credentials, 'email');
  }

  public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
  {
    return new JsonResponse(
      [
        'error' => 'Authentication failure'
      ],
      Response::HTTP_UNAUTHORIZED
    );
  }

  public function onAuthenticationSuccess(Request $request, TokenInterface $token, String $providerKey): ?Response
  {
    return null;
  }

  public function supportsRememberMe(): bool
  {
    return false;
  }
}
