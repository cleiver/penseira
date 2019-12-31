<?php

namespace App\Handler;

use App\Exception\EntityException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionHandler implements EventSubscriberInterface
{
  /**
   * Returns an array of event names this subscriber wants to listen to.
   *
   * The array keys are event names and the value can be:
   *
   *  * The method name to call (priority defaults to 0)
   *  * An array composed of the method name to call and the priority
   *  * An array of arrays composed of the method names to call and respective
   *    priorities, or 0 if unset
   *
   * For instance:
   *
   *  * ['eventName' => 'methodName']
   *  * ['eventName' => ['methodName', $priority]]
   *  * ['eventName' => [['methodName1', $priority], ['methodName2']]]
   *
   * @return array The event names to listen to
   */
  public static function getSubscribedEvents(): array
  {
    return [
      KernelEvents::EXCEPTION => 'handleKernelException'
    ];
  }

  /**
   * Redirect kernel exceptions to appropriate handlers
   * 
   * @todo less ifs, cleaner code
   */
  public function handleKernelException(ExceptionEvent $event)
  {
    if ($event->getThrowable() instanceof NotFoundHttpException) {
      $this->handle404Exception($event);
    } else if ($event->getThrowable() instanceof EntityException) {
      $this->handleEntityException($event);
    }
  }

  /**
   * Creates a proper response to 404 exceptions
   * 
   * @todo Use response factory
   */
  public function handle404Exception(ExceptionEvent $event)
  {
    $event->setResponse(new JsonResponse([
      'error' => $event->getThrowable()->getMessage(),
    ], Response::HTTP_NOT_FOUND));
  }

  /**
   * Creates a proper response to entities exceptions
   * 
   * @todo Use response factory
   */
  public function handleEntityException(ExceptionEvent $event)
  {
    $event->setResponse(new JsonResponse([
      'error' => $event->getThrowable()->getMessage(),
    ], Response::HTTP_BAD_REQUEST));
  }
}
